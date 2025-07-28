import connectDB from "@/config/db";
import Batch from "@/models/batchModel";
import Notice from "@/models/noticeModel";
import Event from "@/models/eventsModel";
import Gallery from "@/models/galleryModel";
import Post from "@/models/postModel";
import Student from "@/models/studentModel";
import Teacher from "@/models/teacherModel";

export async function getBatchById(id) {
  await connectDB();
  const item = await Batch.findById(id);
  return item;
}

export async function getEventById(id) {
  await connectDB();
  const item = await Event.findById(id);
  return item;
}

export async function getGalleryById(id) {
  await connectDB();
  const item = await Gallery.findById(id);
  return item;
}

export async function getNoticeById(id) {
  await connectDB();
  const item = await Notice.findById(id);
  return item;
}

export async function getPostById(id) {
  await connectDB();
  const item = await Post.findById(id);
  return item;
}

export async function getStudentById(id) {
  await connectDB();
  const item = await Student.findById(id).populate("batch", "name");
  return item;
}

export async function getTeacherById(id) {
  await connectDB();
  const item = await Teacher.findById(id);
  return item;
}
