"use server";
import connectDB from "@/config/db";
import Batch from "@/models/batchModel";
import Notice from "@/models/noticeModel";
import Event from "@/models/eventsModel";
import Gallery from "@/models/galleryModel";
import Post from "@/models/postModel";
import Student from "@/models/studentModel";
import Teacher from "@/models/teacherModel";
import OrganizationInfo from "@/models/linksandcontent";

export async function getAllBatch() {
  await connectDB();
  return await Batch.find().sort({ createDate: -1 });
}

export async function getPaginatedEvents({ page = 1, limit = 10 }) {
  await connectDB();

  const skip = (page - 1) * limit;

  const events = await Event.find()
    .sort({ createDate: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Event.countDocuments();

  return {
    events,
    count: events.length,
    total,
    page,
    limit,
  };
}

export async function getPaginatedGalleries({ page = 1, limit = 10 }) {
  await connectDB();

  const skip = (page - 1) * limit;

  const galleries = await Gallery.find()
    .sort({ createDate: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Gallery.countDocuments();

  return {
    galleries,
    count: galleries.length,
    total,
    page,
    limit,
  };
}

export async function getPaginatedNotices({ page = 1, limit = 10 }) {
  await connectDB();

  const skip = (page - 1) * limit;

  const notices = await Notice.find()
    .sort({ createDate: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Notice.countDocuments();

  return {
    notices,
    count: notices.length,
    total,
    page,
    limit,
  };
}

export async function getPaginatedPosts({ page = 1, limit = 10 }) {
  "use server";
  await connectDB();

  const skip = (page - 1) * limit;

  const posts = await Post.find()
    .sort({ createDate: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Post.countDocuments();

  return {
    posts,
    count: posts.length,
    total,
    page,
    limit,
  };
}

export async function getPaginatedStudents({
  batch,
  type,
  search,
  sortBy,
  sortOrder,
  page = 1,
  limit = 10,
}) {
  await connectDB();

  const filter = {};
  if (batch) filter.batch = batch;
  if (type) filter.type = { $regex: type, $options: "i" };
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { phone: { $regex: search, $options: "i" } },
      { profession: { $regex: search, $options: "i" } },
    ];
  }

  const sort = {};
  if (sortBy) sort[sortBy] = sortOrder === "desc" ? -1 : 1;

  const skip = (page - 1) * limit;

  const students = await Student.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .populate("batch", "name");

  const total = await Student.countDocuments(filter);

  return {
    students,
    count: students.length,
    total,
    page,
    limit,
  };
}

export async function getPaginatedTeachers({
  search,
  sortBy = "createDate",
  sortOrder = "desc",
  page = 1,
  limit = 10,
}) {
  await connectDB();

  const filter = {};
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { phone: { $regex: search, $options: "i" } },
      { title: { $regex: search, $options: "i" } },
    ];
  }

  const sort = {};
  sort[sortBy] = sortOrder === "desc" ? -1 : 1;

  const skip = (page - 1) * limit;

  const teachers = await Teacher.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit);

  const total = await Teacher.countDocuments(filter);

  return {
    teachers,
    count: teachers.length,
    total,
    page,
    limit,
  };
}

export async function getLinksContent() {
  await connectDB();

  const newOrgInfo = await OrganizationInfo.find();

  return { data: newOrgInfo[0] };
}
