import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Logo from "../../assets/Logo/logo.png"
import CourseRow from './CourseRow';

const initialCourses = [
  { id: "1", title: 'Interview preparation with JavaScript 2.0', price: 'Rs. 9000/-', type: 'Course' },
  { id: "2", title: 'Aptitude - Averages, Mixtures & Allegation', price: 'Free', type: 'Mock Test' },
  { id: "3", title: 'Aptitude - Simple & Compound Interest', price: 'Free', type: 'Mock Test' },
  { id: "4", title: 'Aptitude - Partnership', price: 'Free', type: 'Mock Test' },
  { id: "5", title: 'Aptitude - Time & Work', price: 'Free', type: 'Mock Test' },
];

const CourseList = () => {
  const [courses, setCourses] = useState(initialCourses);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const onDragEnd = (result) => {
    console.log(result);
    if (!result.destination) return;
    const reorderedCourses = Array.from(courses);
    const [movedCourse] = reorderedCourses.splice(result.source.index, 1);
    reorderedCourses.splice(result.destination.index, 0, movedCourse);
    setCourses(reorderedCourses);
  };

  return (
    <div
    className='w-full h-full md:h-lvh bg-[#adcab0] flex flex-col items-center'
    >

      <h1
      className='md:text-7xl p-5 font-bold text-[#4F6F52]'
      >
        Chai aur Code
      </h1>
      <DragDropContext onDragEnd={onDragEnd}>
      <div className="my-12 mx-auto bg-white p-10 md:w-[70%] h-[90%] rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Manage Bundle</h2>
        <p className="text-gray-600 mb-8">Change orders of the products based on priority</p>
          <Droppable 
          droppableId="courses"
          type="ROWS"
          direction="vertical"
          >
            {(provided) => (
              <div 
              {...provided.droppableProps} 
              ref={provided.innerRef} 
              className="space-y-4"
              >
                {courses.map((course, index) => (
                  <Draggable 
                  key={course.id} 
                  draggableId={course.id} 
                  index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        className="flex justify-between p-4 border border-gray-300 bg-white rounded shadow-md relative"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gray-200 flex items-center justify-center">
                          <span className="material-icons">drag_handle</span>
                          </div>
                          <div className="text-left">
                          <p className="text-lg font-medium">{course.title}</p>
                          </div>
                          <div className="text-right">
                          
                          </div>
                      </div>
                      <div className="flex items-center space-x-10 relative">
                          <span className="text-sm text-gray-500">{course.price}</span>
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded">{course.type}</span>
                          <button
                          className="material-icons"
                          onClick={() => setDropdownOpen(dropdownOpen === index ? null : index)}
                          >
                          more_vert
                          </button>
                          {dropdownOpen === index && (
                          <div className="absolute right-10 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                              <button
                              className="block px-4 py-2 text-left w-full hover:bg-gray-100"
                              onClick={() => {
                                  moveCourseToTop(index);
                                  setDropdownOpen(null);
                              }}
                              >
                              Move To Top
                              </button>
                              <button
                              className="block px-4 py-2 text-left w-full hover:bg-gray-100"
                              onClick={() => {
                                  moveCourseToBottom(index);
                                  setDropdownOpen(null);
                              }}
                              >
                              Move To Bottom
                              </button>
                              <button
                              className="block px-4 py-2 text-left w-full hover:bg-gray-100 text-red-600"
                              onClick={() => {
                                  removeCourse(index);
                                  setDropdownOpen(null);
                              }}
                              >
                              Remove
                              </button>
                          </div>
                          )}
                      </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        
        <div
        className='w-full flex justify-end p-4'
        >
            <a 
            href="https://chaicode.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="md:w-36 md:h-36 w-20 h-20 md:absolute md:bottom-10 md:right-10"
            >
                <img 
                src={Logo} 
                alt="ChaiCode Logo" 
                className='rounded-[18px]'
                />
            </a>
        </div>
      </div>
      </DragDropContext>
    </div>
  );

  function moveCourseToTop(index) {
    const newCourses = [...courses];
    const [movedCourse] = newCourses.splice(index, 1);
    newCourses.unshift(movedCourse);
    setCourses(newCourses);
  }

  function moveCourseToBottom(index) {
    const newCourses = [...courses];
    const [movedCourse] = newCourses.splice(index, 1);
    newCourses.push(movedCourse);
    setCourses(newCourses);
  }

  function removeCourse(index) {
    const newCourses = [...courses];
    newCourses.splice(index, 1);
    setCourses(newCourses);
  }
};

export default CourseList;
