import { RectangleGroupIcon } from "@heroicons/react/24/outline";
import {
  UserIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  PhoneIcon,
  BoltIcon,
  InformationCircleIcon,
  PencilIcon,
  CodeBracketIcon,
  DocumentChartBarIcon,
} from "@heroicons/react/24/outline";
import { IdentificationIcon } from "@heroicons/react/24/outline";
import { AcademicCapIcon } from "@heroicons/react/24/outline";
import { Navbar, Footer, Loader } from "../Components";
import { useState } from "react";

const TextInput = ({
  Icon,
  placeholder,
  textArea = false,
  onChange,
  value,
  name,
}: {
  Icon: any;
  placeholder: string;
  textArea?: boolean;
  onChange: any;
  value: string;
  name: string;
}) => {
  return (
    <div className="flex flex-row items-start gap-3 border p-3 rounded-xl">
      <Icon className="w-7 h-7" />
      {!textArea && (
        <input
          required
          type="text"
          className="w-full h-full outline-none"
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          name={name}
        />
      )}

      {textArea && (
        <textarea
          required
          className="w-full h-full outline-none"
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          name={name}
        />
      )}
    </div>
  );
};

export default function HiringForm() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    uid: "",
    name: "",
    section: "",
    group: "",
    yearOfGraduation: "",
    experience: "",
    phoneNumber: "",
    team: "",
    role: "",
    introduction: "",
    previousProjects: "",
    resumeLink: "",
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (loading) {
      alert("Please wait for the previous request to complete");
      return;
    }

    setLoading(true);
    console.log(formData);
    // Some API Call
    const res = await fetch(
      "http://testingapps.pythonanywhere.com/api/insert/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: formData.uid,
          name: formData.name,
          email: `${formData.uid}@cuchd.in`,
          section: formData.section,
          group: formData.group,
          yearOfGraduation: formData.yearOfGraduation,
          experience: formData.experience,
          phoneNumber: formData.phoneNumber,
          team: formData.team,
          role: formData.role,
          introduction: formData.introduction,
          previousProjects: formData.previousProjects,
          resumeLink: formData.resumeLink,
        }),
      }
    );

    const data = await res.json();
    alert(data.message)
    setFormData({
      uid: "",
      name: "",
      section: "",
      group: formData.group,
      yearOfGraduation: formData.yearOfGraduation,
      experience: formData.experience,
      phoneNumber: "",
      team: "",
      role: "",
      introduction: "",
      previousProjects: "",
      resumeLink: "",
    });
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-7xl my-10 p-12">
        <h1 className="text-2xl md:text-4xl font-bold mb-5 text-red-600">
          Complete Your Details
        </h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 mt-16">
          <TextInput
            Icon={IdentificationIcon}
            placeholder="UID"
            onChange={handleChange}
            value={formData.uid}
            name="uid"
          />
          <TextInput
            Icon={UserIcon}
            placeholder="Name"
            onChange={handleChange}
            value={formData.name}
            name="name"
          />
          <TextInput
            Icon={RectangleGroupIcon}
            placeholder="Section"
            onChange={handleChange}
            value={formData.section}
            name="section"
          />

          <div className="flex flex-row items-center gap-3 border p-3 rounded-xl">
            <UserGroupIcon className="w-7 h-7" />
            <select
              className="bg-white outline-none"
              name="group"
              onChange={handleChange}
            >
              <option value="not-selected">Group</option>
              <option value="A">A</option>
              <option value="B">B</option>
            </select>
          </div>

          <div className="flex flex-row items-start gap-3 border p-3 rounded-xl">
            <AcademicCapIcon className="w-7 h-7" />
            <select
              className="bg-white outline-none"
              name="yearOfGraduation"
              onChange={handleChange}
            >
              <option value="not-selected">Year of Graduation</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
            </select>
          </div>

          <div className="flex flex-row items-start gap-3 border p-3 rounded-xl">
            <ArrowTrendingUpIcon className="w-7 h-7" />
            <select
              className="bg-white outline-none"
              name="experience"
              onChange={handleChange}
            >
              <option value="not-selected">Experienced</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <TextInput
            Icon={PhoneIcon}
            placeholder="Phone Number"
            onChange={handleChange}
            value={formData.phoneNumber}
            name="phoneNumber"
          />
          <TextInput
            Icon={BoltIcon}
            placeholder="Team"
            onChange={handleChange}
            value={formData.team}
            name="team"
          />
          <TextInput
            Icon={InformationCircleIcon}
            placeholder="Role"
            onChange={handleChange}
            value={formData.role}
            name="role"
          />
          <TextInput
            Icon={PencilIcon}
            placeholder="Introduction"
            textArea
            onChange={handleChange}
            value={formData.introduction}
            name="introduction"
          />
          <TextInput
            Icon={CodeBracketIcon}
            placeholder="Projects"
            onChange={handleChange}
            value={formData.previousProjects}
            name="previousProjects"
          />
          <TextInput
            Icon={DocumentChartBarIcon}
            placeholder="Resume"
            onChange={handleChange}
            value={formData.resumeLink}
            name="resumeLink"
          />
        </div>

        <button
          className="bg-red-600 px-12 py-4 text-white rounded-xl my-6 hover:bg-red-700 w-fit"
          onClick={handleSubmit}
        >
          {loading ? <Loader /> : "Submit"}
        </button>
      </div>
      <Footer />
    </>
  );
}
