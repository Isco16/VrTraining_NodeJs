// const sequelize = require('../db/connectionDb.js');
const Course = require('../models/courses.model.js');

//Get all courses.
const getCourses = async (req, res) => {
  try{
    const courses = await Course.findAll();
    res.json(courses);
  }
  catch(error){
    console.error(`An ERROR has occurred when getting all courses: ${error}`);
  }
}

//Get a course.
const getCourse = async (req, res) => {
    try{
      const {id} = req.params;
      const resultado = await Course.findByPk(id);
      console.log(resultado);
      res.json(resultado);
    }
    catch(error){
      console.error(`An ERROR has occurred when getting the course: ${error}`);
    }
};
  
//Add a course.
const addCourse = async (req,res) => {
  const { name, description, created_by } = req.body;
  try {
    const newCourse = await Course.create({
      name,
      description,
      created_by
  });
  res.json(newCourse);
  } catch (error) {
    console.error(`An ERROR has occured when creating the course: ${error}`);
  }
};

//Delete a course.
const deleteCourse = async (req,res) => {
  try {
    const { id } = req.params;
    const deletedCourse = await Course.destroy({
      where : { course_id: id}
    });
    res.json({ message: 'Course deleted successfully' + deletedCourse});
  } catch (error) {
    console.log(`An ERROR has occurred when deleting the course: ${error}`);
    res.status(500).json({ message: 'An ERROR has occurred when deleting the course.' }, error);
  }
};

//Update a course.
const updateCourse = async (req,res) => {
  try {
    const { id } = req.params;
    const { name, description, created_by, created_at } = req.body;
    const updatedCourse = await Course.update(
      {
          name: name,
          description: description,
          created_by: created_by,
          created_at: created_at
      },
      {
          where: { course_id: id }
      });
    res.send('Registry updated successfully.');
  } catch (error) {
    console.error(`An ERROR has occured when updating the course: ${error}`);
    res.status(500).send(error);
  }
};

//Export CRUD methods for courses.
module.exports = {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
};