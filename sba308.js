// SBA Data

// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 40
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 420
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 40
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 150
      }
    }
  ];

function getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions) {
  // Validate if AssignmentGroup belongs to the course
  if (CourseInfo.id !== AssignmentGroup.course_id) {
    throw new Error("Invalid input: AssignmentGroup does not belong to the course");
  }

  const result = [];

  // Iterate over each learner submission
  for (const submission of LearnerSubmissions) {
    const learnerId = submission.learner_id;
    const learnerSubmissions = LearnerSubmissions .filter((s) => s.learner_id === learnerId);

    // Calculate total points and weighted average
    let totalPoints = 0;
    let weightedSum = 0;

    for (const assignment of AssignmentGroup.assignments) {
      const assignmentId = assignment.id;
      const learnerSubmission = learnerSubmissions.find((s) => s.assignment_id === assignmentId);

      if (learnerSubmission && new Date(learnerSubmission.submission.submitted_at) <= new Date(assignment.due_at)) {
        const score = learnerSubmission.submission.score;
        const pointsPossible = assignment.points_possible;

        // Deduct 10% if submission is late
        if (new Date(learnerSubmission.submission.submitted_at) > new Date(assignment.due_at)) {
          totalPoints += pointsPossible * 0.9;
        } else {
          totalPoints += pointsPossible;
        }

        weightedSum += score / pointsPossible * pointsPossible;
      }
    }

    // Calculate average score
    const avgScore = weightedSum / totalPoints;

    // Create object with learner data
    const learnerData = {
      id: learnerId,
      avg: avgScore,
    };

    // Add assignment scores to the object
    for (const assignment of AssignmentGroup.assignments) {
      const assignmentId = assignment.id;
      const learnerSubmission = learnerSubmissions.find((s) => s.assignment_id === assignmentId);

      if (learnerSubmission && new Date(learnerSubmission.submission.submitted_at) <= new Date(assignment.due_at)) {
        const score = learnerSubmission.submission.score;
        const pointsPossible = assignment.points_possible;
        const percentage = score / pointsPossible;

        learnerData[assignmentId] = percentage;
      }
    }

    result.push(learnerData);
  }

  return result;
}


    // the ID of the learner for which this data has been collected
// "id": number,
    // the learner’s total, weighted average, in which assignments
    // with more points_possible should be counted for more
    // e.g. a learner with 50/100 on one assignment and 190/200 on another
    // would have a weighted average score of 240/300 = 80%.
   // "avg": number,
    // each assignment should have a key with its ID,
    // and the value associated with it should be the percentage that
    // the learner scored on the assignment (submission.score / points_possible)
   // <assignment_id>: number,
    // if an assignment is not yet due, it should not be included in either
    // the average or the keyed dictionary of scores
const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log("Maybe right", result);