import {
  getAllAcademicCalendar,
  getAllTableData,
} from "../modules/pageModule.js";

export const handleViewDepartmentPage = async (req, res) => {
  try {
    const academicCalendars = await getAllAcademicCalendar();
    res.render("department", {
      academicCalendars,
    });
  } catch (error) {
    res.render("404");
  }
};

export const handleViewAboutPage = async (req, res) => {
  try {
    const faculty = await getAllTableData("FacultyInfo", "faculty_id");
    res.render("about", {
      faculty,
    });
  } catch (error) {
    res.render("404");
  }
};

export const handleViewCurriculumPage = async (req, res) => {
  try {
    res.render("curriculum");
  } catch (error) {
    res.render("404");
  }
};

export const handleViewExaminationPage = async (req, res) => {
  try {
    res.render("examination");
  } catch (error) {
    res.render("404");
  }
};
