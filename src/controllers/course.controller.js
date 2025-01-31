const sequelize = require('../db/connectionDb.js');
const Course = require('../models/courses.model.js');

const getCourses = async (req, res) => {
  try{
    // const courses = await getCourses();
    const courses = await Course.findAll();
    res.json(courses);
  }
  catch(error){
    console.error(`An ERROR has occurred when getting all courses: ${error}`);
  }
}
  
  // console.log(getCourses());
  
  const getCourse = async (req, res) => {
    // const query = 'SELECT * FROM courses WHERE course_id = $1;';
    // const params = [id];
    // const { rows } = await pool.query(query, params);
    // return rows[0];

    try{
      const {id} = req.params;
      const resultado = await Course.findByPk(id);
      console.log(resultado);
      res.json(resultado);
    }
    catch(error){
      console.error(`An ERROR has occurred when getting the course: ${error}`);
    }
    
    // const course = await Course.findByPk(id);
    // return course;
  }
  
  // INSERT INTO public."User" (id, name, age, birthday, sex, email, phone, institute)
  // VALUES (1, 'John Doe', 25, '1998-05-14', 'm', 'johndoe@example.com', '123-456-7890', 'Example Institute')
  // RETURNING *;
  
  //Agregar productos
  const addCourse = async (req,res) => {
    // const query =
    //   'INSERT INTO "courses" values (DEFAULT, $1, $2, $3)';
    // const params = [name, description, created_by];
    // const { rows, rowCount } = await pool.query(query, params);
    // console.log('New course created');
    // console.log(rows);
    
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
    // res.send('course added successfully.');
    
    // return newCourse;
  };
  
  // addCourse(3, 'John Doe', 25, '1998-05-14', 'm', 'johndoe@example.com', '123-456-7890', 'Example Institute');
  
  const deleteCourse = async (req,res) => {
    // const query = 'DELETE FROM "courses" WHERE course_id = $1';
    // const values = [id];
    // const result = await pool.query(query, values);
    // console.log('Registro eliminado exitosamente' + JSON.stringify(result.rows));

    try {
      const { id } = req.params;
      // await deleteCourse(id);
      const deletedCourse = await Course.destroy({
        where : { course_id: id}
      });
      res.json({ message: 'Course deleted successfully' + deletedCourse});
    } catch (error) {
      console.log(`An ERROR has occurred when deleting the course: ${error}`);
      res.status(500).json({ message: 'An ERROR has occurred when deleting the course.' }, error);
    }

    // return deletedCourse;
  };
  
  // deleteCourse(1);
  
  const updateCourse = async (req,res) => {
    // const query = `UPDATE "courses" SET name = $1, description = $2, created_by = $3, created_at = $4 WHERE course_id = $5`;
    // const params = [name, description, created_by, created_at, id];
    // const result = await pool.query(query, params);
    // console.log(JSON.stringify(result.rows));
    // return result.rows[0];

    try {
      const { id } = req.params;
      const { name, description, created_by, created_at } = req.body;
      // const result = await updateCourse(id, name, description, created_by, created_at);
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

    // return updatedCourse;
  };
  
  // updateCourse(2, "nuevomail@example.com", "+56996527382", "New new Institute");
  
  module.exports = {
    getCourses,
    getCourse,
    addCourse,
    updateCourse,
    deleteCourse,
  };