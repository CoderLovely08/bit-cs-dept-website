import { getAllPaperDetails, getAllTableData } from "../modules/pageModule.js";

export const handleViewAdminLogin = async (req, res) => {
  try {
    res.render("admin/login");
  } catch (error) {
    res.render("404");
  }
};

export const handleViewAdminDashboard = async (req, res) => {
  try {
    const subjects = await getAllTableData("SubjectsInfo", "semester_id");

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
    const syllabus = await getAllTableData("SyllabusInfo", "semester_id");
    const calendar = await getAllTableData("AcademicCalendarInfo", "calendar_id", "DESC");
    const photos = await getAllTableData("GalleryImages");

    const question = await getAllPaperDetails("QuestionPaperInfo");
    const model = await getAllPaperDetails("ModelPaperInfo");
    const sessional = await getAllPaperDetails("SessionalPaperInfo");
    // Create an empty map to store the grouped data
    const groupedQuestionData = new Map();

    // Iterate over the array and group the data
    question.forEach((item) => {
      const {
        semester_id,
        subject_id,
        subject_name,
        subject_code,
        paper_title,
        pdf_link,
      } = item;

      // If the semester_id is not yet in the map, add it
      if (!groupedQuestionData.has(semester_id)) {
        groupedQuestionData.set(semester_id, {});
      }

      // If the subject_id is not yet in the semester object, add it
      if (!groupedQuestionData.get(semester_id)[subject_id]) {
        groupedQuestionData.get(semester_id)[subject_id] = {
          subjectName: subject_name,
          subjectCode: subject_code,
          papers: [],
        };
      }

      // Add the paper to the subject
      groupedQuestionData.get(semester_id)[subject_id].papers.push({
        paperTitle: paper_title,
        pdfLink: pdf_link,
      });
    });
    // Create an empty map to store the grouped data
    const groupedModelData = new Map();

    // Iterate over the array and group the data
    model.forEach((item) => {
      const {
        semester_id,
        subject_id,
        subject_name,
        subject_code,
        paper_title,
        pdf_link,
      } = item;

      // If the semester_id is not yet in the map, add it
      if (!groupedModelData.has(semester_id)) {
        groupedModelData.set(semester_id, {});
      }

      // If the subject_id is not yet in the semester object, add it
      if (!groupedModelData.get(semester_id)[subject_id]) {
        groupedModelData.get(semester_id)[subject_id] = {
          subjectName: subject_name,
          subjectCode: subject_code,
          papers: [],
        };
      }

      // Add the paper to the subject
      groupedModelData.get(semester_id)[subject_id].papers.push({
        paperTitle: paper_title,
        pdfLink: pdf_link,
      });
    });
    // Create an empty map to store the grouped data
    const groupedSessionalData = new Map();

    // Iterate over the array and group the data
    sessional.forEach((item) => {
      const {
        semester_id,
        subject_id,
        subject_name,
        subject_code,
        paper_title,
        pdf_link,
      } = item;

      // If the semester_id is not yet in the map, add it
      if (!groupedSessionalData.has(semester_id)) {
        groupedSessionalData.set(semester_id, {});
      }

      // If the subject_id is not yet in the semester object, add it
      if (!groupedSessionalData.get(semester_id)[subject_id]) {
        groupedSessionalData.get(semester_id)[subject_id] = {
          subjectName: subject_name,
          subjectCode: subject_code,
          papers: [],
        };
      }

      // Add the paper to the subject
      groupedSessionalData.get(semester_id)[subject_id].papers.push({
        paperTitle: paper_title,
        pdfLink: pdf_link,
      });
    });

    res.render("admin/dashboard", {
      subjects,
      groupedSubjects,
      faculty,
      syllabus,
      calendar,
      photos,
      groupedQuestionData,
      groupedModelData,
      groupedSessionalData,
    });
  } catch (error) {
    res.render("404");
  }
};
