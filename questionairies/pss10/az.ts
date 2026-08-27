import { Questionnaire } from "@/types";

export const pss10: Questionnaire = {
    id: "pss10",
    title: "PSS-10 Qavranılan Stress Şkalası",
    description: "Şəxsin həyatdakı stresi subyektiv qavramasının qiymətləndirilməsi",
    tags: ["Stress", "Özünüqiymətləndirmə", "Psixi Sağlamlıq"],
    time: "3-5 dəqiqə",
    details: {
        introduction: "Qavranılan Stress Şkalası-10 (PSS-10) geniş istifadə olunan psixoloji stress qiymətləndirmə vasitəsidir. Şkala 10 bənddən ibarətdir və əsasən son bir ay ərzində şəxsin həyat hadisələrindən qaynaqlanan stresi necə qavradığını qiymətləndirir. PSS-10 konkret stress mənbələrini ölçmür, əksinə şəxsin stresi subyektiv təcrübəsini və qavranılan öhdəsindən gəlmə bacarığını ölçür.",
        questionCount: "10 sual",
        evaluationTime: "Adətən 3-5 dəqiqə",
        instructions: "Son bir ay ərzində müəyyən bir şəkildə hiss etdiyiniz və ya düşündüyünüz vəziyyətlərin nə qədər tez-tez baş verdiyini qiymətləndirin. Vəziyyətinizi ən yaxşı təsvir edən variantı seçin. Hər sualın beş variantı var: Heç vaxt, Demək olar ki, heç vaxt, Bəzən, Kifayət qədər tez-tez, Çox tez-tez.",
        scoringMethod: [
            "Ümumi bal: bütün 10 bəndin cəmi, aralıq 0-40 bal",
            "Müsbət bəndlər: 1, 2, 3, 6, 9, 10 (normal ballandırılır)",
            "Mənfi bəndlər: 4, 5, 7, 8 (əks ballandırılır)",
            "Şiddət: daha yüksək bal daha çox qavranılan stresi göstərir"
        ],
        dimensions: [
            { name: "Stresin Qavranılması", description: "Həyatdakı öncədən görünməzlik və idarə oluna bilməzliyin qavranılması" },
            { name: "Öhdəsindən Gəlmə Bacarığı", description: "Vəziyyətlərin öhdəsindən gəlmək və idarə etmək bacarığına inam" },
            { name: "Stress Yükü", description: "Həyatın tələblərinin öhdəsindən gəlmə bacarığını üstələdiyi hissi" },
            { name: "Emosional Reaksiya", description: "Stresli vəziyyətlərə emosional reaksiyalar" }
        ],
        notes: [
            "Bu şkala yetkinlərdə stresin qavranılması səviyyəsinin qiymətləndirilməsi üçün uyğundur",
            "PSS-10 nəticələrinin mütləq kəsim həddi yoxdur, kompleks təhlil tələb olunur",
            "Davamlı yüksək stress qavranılması fiziki və psixi sağlamlığa təsir edə bilər"
        ],
        references: [
            {
                text: "Cohen, S., Kamarck, T., & Mermelstein, R. (1983). A global measure of perceived stress. Journal of health and social behavior, 385-396.",
                url: "https://www.jstor.org/stable/2136404"
            }
        ]
    },
    questions: [
        { id: 1, content: "Gözlənilməz baş verən hansısa hadisə səbəbindən nə qədər tez-tez pərt olmusunuz?" },
        { id: 2, content: "Həyatınızdakı vacib şeyləri idarə edə bilmədiyinizi nə qədər tez-tez hiss etmisiniz?" },
        { id: 3, content: "Nə qədər tez-tez əsəbi və gərgin hiss etmisiniz?" },
        { id: 4, content: "Şəxsi problemlərinizin öhdəsindən gəlmə bacarığınıza nə qədər tez-tez əminliklə yanaşmısınız?" },
        { id: 5, content: "İşlərin istədiyiniz kimi getdiyini nə qədər tez-tez hiss etmisiniz?" },
        { id: 6, content: "Görməli olduğunuz bütün işlərin öhdəsindən gələ bilmədiyinizi nə qədər tez-tez hiss etmisiniz?" },
        { id: 7, content: "Həyatınızdakı əsəbiləşdirici şeyləri nə qədər tez-tez idarə edə bilmisiniz?" },
        { id: 8, content: "Vəziyyətə tam nəzarət etdiyinizi nə qədər tez-tez hiss etmisiniz?" },
        { id: 9, content: "Nəzarətinizdən kənar şeylər səbəbindən nə qədər tez-tez əsəbiləşmisiniz?" },
        { id: 10, content: "Çətinliklərin öhdəsindən gələ bilməyəcəyiniz qədər yığılıb qaldığını nə qədər tez-tez hiss etmisiniz?" }
    ],
    renderOptions: () => [
        { id: 1, content: "Heç vaxt", value: "0" },
        { id: 2, content: "Demək olar ki, heç vaxt", value: "1" },
        { id: 3, content: "Bəzən", value: "2" },
        { id: 4, content: "Kifayət qədər tez-tez", value: "3" },
        { id: 5, content: "Çox tez-tez", value: "4" }
    ]
};
