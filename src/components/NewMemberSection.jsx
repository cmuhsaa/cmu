import Link from "next/link";

export default function NewMemberSection({ members }) {
  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Welcome New Members
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Celebrating our newest alumni who have recently joined our growing
            community
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {members.map((member, index) => (
            <div
              key={member._id}
              className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <div className="flex items-start gap-6 mb-6">
                <div className="relative">
                  <div
                    className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 flex-shrink-0"
                    style={{
                      backgroundImage: member.avatar.url
                        ? `url('${member.avatar.url}')`
                        : `url('https://readdy.ai/api/search-image?query=${
                            index === 0
                              ? "Young Indian female software engineer professional headshot, confident smile, modern office background, business casual attire, tech industry professional, friendly demeanor"
                              : "Young Indian male medical student professional photo, white coat, hospital or medical college background, stethoscope, confident expression, healthcare professional in training"
                          }&width=200&height=200&seq=member-${index}&orientation=squarish')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <i className="ri-star-fill text-white text-xs w-3 h-3 flex items-center justify-center"></i>
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {member.name}
                  </h3>
                  <div className="text-green-600 font-semibold mb-1">
                    {member.profession}
                  </div>
                  <div className="text-gray-500 text-sm mb-2">
                    {member.address}
                  </div>
                  <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {member.batch.name}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-600 leading-relaxed mb-4">
                  {member.about}
                </p>

                <div className="text-sm text-gray-500">
                  <div className="flex items-center gap-2 mb-2">
                    <i className="ri-calendar-line w-4 h-4 flex items-center justify-center"></i>
                    <span>Joined on {member.createDate.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="ri-map-pin-line w-4 h-4 flex items-center justify-center"></i>
                    <span>{member.address}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <Link
                    href={`mailto:${member.email}`}
                    className="p-3 h-10 bg-green-100 hover:bg-green-200 rounded-full flex items-center justify-center text-green-600 transition-colors duration-300 cursor-pointer"
                  >
                    Email
                  </Link>
                  <Link
                    href={member.phone}
                    className="p-3 h-10 bg-green-100 hover:bg-green-200 rounded-full flex items-center justify-center text-green-600 transition-colors duration-300 cursor-pointer"
                  >
                    Phone
                  </Link>
                </div>

                <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                  NEW
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-3xl p-8 shadow-lg text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-user-add-line text-green-600 text-2xl w-8 h-8 flex items-center justify-center"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Join Our Community
            </h3>
            <p className="text-gray-600 mb-6">
              Are you a graduate of Chanchaitara Madla United High School? Join
              our growing alumni network today!
            </p>
            <Link
              href="/join"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 whitespace-nowrap cursor-pointer"
            >
              Register Now
              <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center"></i>
            </Link>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 text-white text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-trophy-line text-white text-2xl w-8 h-8 flex items-center justify-center"></i>
            </div>
            <h3 className="text-2xl font-bold mb-4">Member Benefits</h3>
            <ul className="text-left space-y-2 mb-6">
              <li className="flex items-center gap-2">
                <i className="ri-check-line w-4 h-4 flex items-center justify-center"></i>
                <span>Exclusive alumni events</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="ri-check-line w-4 h-4 flex items-center justify-center"></i>
                <span>Career networking opportunities</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="ri-check-line w-4 h-4 flex items-center justify-center"></i>
                <span>Mentorship programs</span>
              </li>
            </ul>
            <Link
              href="/objectives"
              className="inline-flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300 whitespace-nowrap cursor-pointer"
            >
              Learn More
              <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center"></i>
            </Link>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/student"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 whitespace-nowrap cursor-pointer"
          >
            View All Members
            <i className="ri-group-line w-5 h-5 flex items-center justify-center"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
