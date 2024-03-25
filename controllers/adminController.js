export const handleViewAdminLogin = async (req, res) => {
  try {
    res.render("admin/login");
  } catch (error) {
    res.render("404");
  }
};
