import { getAllTableData } from "../modules/pageModule.js";

export const handleViewAdminLogin = async (req, res) => {
  try {
    res.render("admin/login");
  } catch (error) {
    res.render("404");
  }
};

export const handleViewAdminDashboard = async (req, res) => {
  try {
    const subjects = await getAllTableData("SubjectsInfo");

    const groupedSubjects = new Map();

    subjects.forEach((subject) => {
      const { semester_id, subject_id, subject_name, subject_code } = subject;

      // If the semester_id is not yet in the map, add it
      if (!groupedSubjects.has(semester_id)) {
        groupedSubjects.set(semester_id, {});
      }

      // If the subject_id is not yet in the semester object, add it
      if (!groupedSubjects.get(semester_id)[subject_id]) {
        groupedSubjects.get(semester_id)[subject_id] = {
          subjectName: subject_name,
          subjectCode: subject_code,
        };
      }
    });

    const faculty = await getAllTableData("FacultyInfo");

    res.render("admin/dashboard", {
      groupedSubjects,
      faculty
    });
  } catch (error) {
    res.render("404");
  }
};
