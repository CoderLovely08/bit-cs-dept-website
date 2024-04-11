import { getPaidEventById, getPaidEventsTransactionsById } from "../modules/DbHelper.js";
import {
  getAllLabManuals,
  getAllPaperDetails,
  getAllTableData,
} from "../modules/pageModule.js";

export const handleViewAdminLogin = async (req, res) => {
  try {
    res.render("admin/login");
  } catch (error) {
    res.render("404");
  }
};

export const handleViewAdminDashboard = async (req, res) => {
  try {
    const results = await Promise.all([
      getAllTableData("FacultyInfo"),
      getAllTableData("SyllabusInfo", "semester_id"),
      getAllTableData("AcademicCalendarInfo", "calendar_id", "DESC"),
      getAllTableData("GalleryImages", "image_id", "DESC"),
      getAllPaperDetails("QuestionPaperInfo"),
      getAllPaperDetails("ModelPaperInfo"),
      getAllPaperDetails("SessionalPaperInfo"),
      getAllTableData("EventsInfo", "event_id", "DESC"),
      getAllTableData("PaidEventsInfo", "event_id", "DESC"),
      getAllTableData("SubjectsInfo", "semester_id"),
      getAllLabManuals(),
    ]);

    const [
      faculty,
      syllabus,
      calendar,
      photos,
      question,
      model,
      sessional,
      events,
      paidEvents,
      subjects,
      manuals,
    ] = results;

    // Process and group subjects
    const groupedSubjects = new Map();

    // Subjects data
    subjects.forEach((subject) => {
      const { semester_id, subject_id, subject_name, subject_code } = subject;

      // If the semester_id is not yet in the map, add it
      if (!groupedSubjects.has(semester_id)) {
        groupedSubjects.set(semester_id, {});
      }

      // If the subject_id is not yet in the semester object, add it
      if (!groupedSubjects.get(semester_id)[subject_id]) {
        groupedSubjects.get(semester_id)[subject_id] = {
          subjectId: subject_id,
          subjectName: subject_name,
          subjectCode: subject_code,
        };
      }
    });

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
        paper_id,
      } = item;

      // If the semester_id is not yet in the map, add it
      if (!groupedQuestionData.has(semester_id)) {
        groupedQuestionData.set(semester_id, {});
      }

      // If the subject_id is not yet in the semester object, add it
      if (!groupedQuestionData.get(semester_id)[subject_id]) {
        groupedQuestionData.get(semester_id)[subject_id] = {
          subjectId: subject_id,
          subjectName: subject_name,
          subjectCode: subject_code,
          papers: [],
        };
      }

      // Add the paper to the subject
      groupedQuestionData.get(semester_id)[subject_id].papers.push({
        paperId: paper_id,
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
          subjectId: subject_id,
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

    const groupedManuals = new Map();

    manuals.forEach((subject) => {
      const {
        semester_id,
        subject_id,
        subject_name,
        subject_code,
        pdf_link_src,
        manual_id,
      } = subject;

      // If the semester_id is not yet in the map, add it
      if (!groupedManuals.has(semester_id)) {
        groupedManuals.set(semester_id, {});
      }

      // If the subject_id is not yet in the semester object, add it
      if (!groupedManuals.get(semester_id)[subject_id]) {
        groupedManuals.get(semester_id)[subject_id] = {
          manualId: manual_id,
          subjectName: subject_name,
          subjectCode: subject_code,
          pdfLink: pdf_link_src,
        };
      }
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
      events,
      paidEvents,
      groupedManuals,
    });
  } catch (error) {
    res.render("404");
  }
};

export const handleViewPaymentHistory = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await getPaidEventById(eventId);
    const transactions = await getPaidEventsTransactionsById(eventId);

    const collectionAmount = transactions.length * event[0].amount;

    return res.render("admin/paymentHistory", {
      event: event[0],
      transactions: transactions,
      collectionAmount,
    });
  } catch (error) {
    console.log(error);
    res.render("404");
  }
};
