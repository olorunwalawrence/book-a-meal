const getAllMeals = (res, db) => res.status(200).json({
  status: 200,
  data: db
});

export default getAllMeals;
