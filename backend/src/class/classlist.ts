import { Elysia, t } from "elysia";
import { auth } from "../utils/auth";
import { Enroll } from "../models/enroll";
import { Class } from "../models/class";
import { UserRole } from "../types/type";

export const classlist = (app: Elysia) =>
  app.use(auth).get("/", async ({ profile, set }) => {
    if (set.status !== 200) return "Unauthorized";
    if (!profile) {
      set.status = 401;
      return "Unauthorized";
    }
    try {
      const classlist =
        profile.role === UserRole.student
          ? await studentList(Number(profile.id))
          : await instructorList(Number(profile.id));

      return {
        data: {
          class: classlist,
        },
      };
    } catch (err) {
      set.status = 500;
      return "Query Failed";
    }
  });

const studentList = async (id: number) => {
  try {
    const result = await Enroll.createQueryBuilder("enroll")
      .leftJoinAndSelect("enroll.class", "class")
      .leftJoinAndSelect("class.instructor", "instructor")
      .where("enroll.studentId = :id", { id: id })
      .select(["enroll.id", "class.id", "class.name", "instructor.name"])
      .getMany();

    if (!result) {
      return { data: { class: [] } };
    }

    const classes = result.map((enroll) => {
      return {
        // id: enroll.id,
        id: enroll.class?.id,
        teacher: enroll.class?.instructor?.name,
        className: enroll.class?.name,
      };
    });
    return classes;
  } catch (err) {
    throw err;
  }
};

const instructorList = async (id: number) => {
  try {
    const result = await Class.createQueryBuilder("class")
      .where("class.instructorId = :id", { id: id })
      .select(["class.id", "class.name"])
      .getMany();

    if (!result) {
      return { data: { class: [] } };
    }

    const classes = result.map((class_) => {
      return {
        id: class_.id,
        className: class_.name,
      };
    });
    return classes;
  } catch (err) {
    throw err;
  }
};
