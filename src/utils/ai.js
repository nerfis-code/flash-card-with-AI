import { GoogleGenerativeAI } from "@google/generative-ai";


export default async function isCorrectAnswer(correntAnswer, userAnswer) {
    const genAI = new GoogleGenerativeAI(Aqui deberia estar la key);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `si ambos respuesta tratan de decir lo mismo reponde solo con un string de json atributo correct que ponga true o false y si es false pon un atributo why discribiendo el porque de la desicion"${correntAnswer}" "${userAnswer}"`;


    const result = await model.generateContent(prompt);
    return result.response.text()
}
