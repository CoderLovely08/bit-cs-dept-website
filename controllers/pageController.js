import { getAllAcademicCalendar } from "../modules/pageModule.js";

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
