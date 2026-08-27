import useGetLang from "./useGetLang";
import { questionnairesAz } from "@/questionairies/az";
import { questionnairesRu } from "@/questionairies/ru";

export function useQuestionnaire(id?: string) {
    const lang = useGetLang();
    const questionnaires = lang === 'ru' ? questionnairesRu : questionnairesAz;
    if (!id) return questionnaires;
    const questionnaire = questionnaires.find((q) => q.id === id);
    return questionnaire;
}
