import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers["authorization"]?.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ success: false, message: "Unauthorized" });
            }else{
                req.user = decoded;
                next();
            }
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export default authMiddleware