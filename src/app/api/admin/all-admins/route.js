// app/api/admin/manage/route.js
import { NextResponse } from 'next/server';
import Admin from '@/models/adminModel';
import connectDB from '@/config/db';

export async function GET(request) {
  await connectDB();

  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');
    const email = searchParams.get('email');
    const phone = searchParams.get('phone');
    const isApproved = searchParams.get('isApproved');
    const sortBy = searchParams.get('sortBy');
    const sortOrder = searchParams.get('sortOrder');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const search = searchParams.get('search');

    // Build the filter object
    const filter = {};

    if (name) filter.name = { $regex: name, $options: "i" };
    if (email) filter.email = { $regex: email, $options: "i" };
    if (phone) filter.phone = { $regex: phone, $options: "i" };
    if (isApproved) filter.isApproved = isApproved === "true";

    // Search across multiple fields
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }

    // Build the sort object
    const sort = {};
    if (sortBy) {
      sort[sortBy] = sortOrder === "desc" ? -1 : 1;
    }

    // Pagination
    const skip = (page - 1) * limit;

    // Fetch admins with filters, sorting, and pagination
    const admins = await Admin.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .select("-password"); // Exclude password field

    // Count total documents for pagination
    const totalAdmins = await Admin.countDocuments(filter);

    return NextResponse.json({
      success: true,
      count: admins.length,
      total: totalAdmins,
      page,
      limit,
      admins,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}