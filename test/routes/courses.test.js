const request = require("supertest");
const app = require("../../src/index.js");
const { getCourse } = require("../../src/models/courses.model.js");
// const { getCourses } = require("../../src/models/courses.model.js");

// const {
//     getCourse,
//     deleteCourse
// } = require("../../src/models/courses.model.js")

const courses = [
  {
    course_id: 2,
    name: "Advanced VR Techniques",
    description: "Master advanced techniques and environments in VR.",
    created_by: 6,
    created_at: "2024-12-05T15:23:12.943Z",
  },
  {
    course_id: 3,
    name: "Team Collaboration in VR",
    description: "Learn to collaborate in VR environments effectively.",
    created_by: 8,
    created_at: "2024-12-05T15:23:12.943Z",
  },
  {
    course_id: 4,
    name: "VR for Healthcare",
    description: "Specialized VR training for healthcare professionals.",
    created_by: 2,
    created_at: "2024-12-05T15:23:12.943Z",
  }
];

jest.mock("../../src/models/courses.model.js", () => {
  return {
    getCourses: jest.fn(() => {
      return Promise.resolve(courses);
    }),
    getCourse : jest.fn((course_id)=>{
      // Los parametros de una peticion se entregan como string, a pesar que el tipo sea distinto?
      const idNum = parseInt(course_id);
      const course = courses.find((course) => course.course_id === idNum);
      if(course)
        return Promise.resolve(course);

      return Promise.reject();
    }),
    deleteCourse: jest.fn((course_id) => {
      // Los parametros de una peticion se entregan como string, a pesar que el tipo sea distinto?
      const idNum = parseInt(course_id);
      const course2Del = courses.find((course) => course.course_id === idNum);

      const idx = courses.indexOf(course2Del);
      courses.splice(idx, 1);

      if (!courses.includes(course2Del)) 
        return Promise.resolve();

      return Promise.reject();
    }),    
  };
});

describe("/api/v1/courses", () => {

  it("GET/ Should return all courses registries array.", async () => {
    const { statusCode, body } = await request(app).get("/api/v1/courses");
    expect(body).toStrictEqual(courses);
  });
  
  it("GET/ Should return a course registry by course_id.", async () => {
    const course_id = 2;
    const courseTest = courses.find(course => course.course_id === course_id);
    const { statusCode, body } = await request(app).get(`/api/v1/courses/${course_id}`);
    expect(body).toStrictEqual(courseTest);
  });

  it("DELETE/ If course_id exists, then should return 200 status.", async () => {
    const course_id = 2;
    const res = await request(app).delete(`/api/v1/courses/${course_id}`);
    expect(res.status).toBe(200);
  });
});
