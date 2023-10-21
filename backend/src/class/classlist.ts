import { Enroll } from "../models/enroll";
import { Class } from "../models/class";
import { UserRole } from "../types/type";
import { AuthType } from "../types/type";

export const classlist = (app: AuthType) =>
  app.get("/", async ({ profile, set }) => {
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
      .select([
        "enroll.id",
        "class.id",
        "class.name",
        "instructor.name",
        "class.time",
      ])
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
        time: enroll.class?.time,
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
      .select(["class.id", "class.name", "class.time"])
      .getMany();

    if (!result) {
      return { data: { class: [] } };
    }

    const classes = result.map((row) => {
      return {
        id: row.id,
        className: row.name,
        time: row.time,
      };
    });
    return classes;
  } catch (err) {
    throw err;
  }
};
