import { asyncError } from "@/middleware/error";


const handler = asyncError(async (req, res) => {
  const { email, password } = req.body;
});

export default handler;
