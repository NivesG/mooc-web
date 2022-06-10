export interface Course  {
  name: string;
  exerciseCount: number;
}

export interface CourseArray {
  courseArray: Course[];
}

export interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

export interface CoursePartExtended extends CoursePartBase {
  description: string
}

export interface CourseNormalPart extends CoursePartExtended {
  type: "normal";
}
export interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

export interface CourseSubmissionPart extends CoursePartExtended {
  type: "submission";
  exerciseSubmissionLink: string;
}

export interface Special extends CoursePartExtended {
  type: "special";
  requirements: Array<string>;
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | Special;