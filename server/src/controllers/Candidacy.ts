import { Candidacy } from "../models";
import { CandidacyType, CandidacyUpdateType, ResponseType } from "../types";

// export const CreateCandidacy = async (
//   CandidacyData: CandidacyType
// ): Promise<ResponseType> => {
//   let responsePayload: ResponseType = {
//     success: true,
//     status: 201,
//   };

//   const { applicationDate, company, jobTitle, platform } = CandidacyData;

//   if (!applicationDate || !company || !jobTitle || !platform) {
//     return {
//       success: false,
//       status: 400,
//       msg: "Please provide all the required fields.",
//     };
//   }

//   try {
//     const newCandidacy = new Candidacy({
//       applicationDate,
//       company,
//       jobTitle,
//       platform,
//     });
//     await newCandidacy.save();

//     (responsePayload.msg = "Candidacy created successfully."),
//       (responsePayload.data = newCandidacy);
//   } catch (e: any) {
//     responsePayload = {
//       success: false,
//       status: 500,
//       msg: "Internal server error, please try again later or contact the administrator or developpers.",
//     };
//   }

//   return responsePayload;
// };

export const GetCandidacies = async (): Promise<ResponseType> => {
  let responsePayload: ResponseType = {
    success: true,
    status: 200,
  };

  try {
    const candidacies = await Candidacy.find();

    responsePayload = {
      success: true,
      msg: "Candidacies fetched successfully.",
      data: candidacies,
    };
  } catch (e: any) {
    responsePayload = {
      success: false,
      status: 500,
      msg: "Internal server error, please try again later or contact the administrator or developpers.",
    };
  }

  return responsePayload;
};

export const GetCandidacy = async (id: string): Promise<ResponseType> => {
  let responsePayload: ResponseType = {
    success: true,
    status: 200,
  };

  try {
    const candidacy = await Candidacy.findById(id);

    if (!candidacy) {
      responsePayload = {
        success: false,
        status: 404,
        msg: "Candidacy not found.",
        data: null,
      };

      return responsePayload;
    }

    (responsePayload.msg = "Candidacy fetched successfully."),
      (responsePayload.data = candidacy);
  } catch (e: any) {
    responsePayload = {
      success: false,
      status: 500,
      msg: "Internal server error, please try again later or contact the administrator or developpers.",
    };
  }

  return responsePayload;
};

export const UpdateCandidacy = async (
  id: string,
  CandidacyData: CandidacyUpdateType
): Promise<ResponseType> => {
  let responsePayload: ResponseType = {
    success: true,
    status: 200,
  };

  try {
    const candidacy = await Candidacy.findByIdAndUpdate(id, CandidacyData, {
      new: true,
    });

    if (!candidacy) {
      responsePayload = {
        success: false,
        status: 404,
        msg: "Candidacy not found.",
      };

      return responsePayload;
    }

    responsePayload.msg = "Candidacy updated successfully.";
    responsePayload.data = candidacy;
  } catch (e: any) {
    responsePayload = {
      success: false,
      status: 500,
      msg: "Internal server error, please try again later or contact the administrator or developpers.",
    };
  }
  return responsePayload;
};

export const DeleteCandidacy = async (id: string): Promise<ResponseType> => {
  let responsePayload: ResponseType = {
    success: true,
    status: 200,
  };

  try {
    const candidacy = await Candidacy.findByIdAndDelete(id);

    if (!candidacy) {
      responsePayload = {
        success: false,
        status: 404,
        msg: "Error, candidacy not found.",
      };

      return responsePayload;
    }

    responsePayload.msg = "Candidacy deleted successfully.";
  } catch (e: any) {
    responsePayload = {
      success: false,
      status: 500,
      msg: "Internal server error, please try again later or contact the administrator or developpers.",
    };
  }

  return responsePayload;
};

export const DeleteAllCandidacies = async (): Promise<ResponseType> => {
  let responsePayload: ResponseType = {
    success: true,
    status: 200,
  };

  try {
    await Candidacy.deleteMany();

    responsePayload.msg = "All candidacies deleted successfully.";
  } catch (e: any) {
    responsePayload = {
      success: false,
      status: 500,
      msg: "Internal server error, please try again later or contact the administrator or developpers.",
    };
  }

  return responsePayload;
};
