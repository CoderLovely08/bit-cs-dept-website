import {
  getAllAcademicCalendar,
  getAllPaperDetails,
  getAllSyllabusInfo,
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
    // const syllabus = await getAllSyllabusInfo();
    const syllabus = await getAllTableData("SyllabusInfo", "semester_id");
    res.render("curriculum", {
      syllabus,
    });
  } catch (error) {
    res.render("404");
  }
};

export const handleViewExaminationPage = async (req, res) => {
  try {
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

    res.render("examination", {
      groupedQuestionData,
      groupedModelData,
      groupedSessionalData,
    });
  } catch (error) {
    res.render("404");
  }
};

export const handleViewGalleryPage = async (req, res) => {
  try {
    const images = await getAllTableData("GalleryImages");
    res.render("gallery", {
      images,
    });
  } catch (error) {
    res.render("404");
  }
};
