import { Questionnaire } from "@/types";

export const sds: Questionnaire = {
    id: "sds",
    title: "SDS Zung Özünüqiymətləndirmə Depressiya Şkalası",
    description: "Depressiya simptomlarının şiddətinin qiymətləndirilməsi",
    tags: ["Depressiya", "Özünüqiymətləndirmə", "Skrininq"],
    time: "5-10 dəqiqə",
    details: {
        introduction: "Özünüqiymətləndirmə Depressiya Şkalası (SDS) 1965-ci ildə Zung tərəfindən depressiya simptomlarının şiddətini qiymətləndirmək üçün hazırlanmışdır. Şkala 20 bənddən ibarətdir və depressiyanın emosional, somatik, psixomotor və psixoloji aspektlərini əhatə edir. İstifadəsi sadədir və depressiyanın skrininqi üçün vasitə kimi uyğundur.",
        questionCount: "20 sual",
        evaluationTime: "Adətən 5-10 dəqiqə",
        instructions: "Zəhmət olmasa son bir həftə ərzində özünüzü necə hiss etdiyinizi qiymətləndirin. Vəziyyətinizi ən yaxşı təsvir edən variantı seçin. Hər sualın dörd variantı var: Vaxtın az hissəsində, Vaxtın bəzi hissəsində, Vaxtın çox hissəsində, Vaxtın demək olar ki, hamısında.",
        scoringMethod: [
            "Ümumi bal: bütün 20 bəndin cəmi, sonra 1.25-ə vurulub standart bal əldə edilir",
            "Müsbət bəndlər: 1, 3, 4, 7, 8, 9, 10, 13, 15, 19 (normal ballandırılır)",
            "Mənfi bəndlər: 2, 5, 6, 11, 12, 14, 16, 17, 18, 20 (əks ballandırılır)",
            "Şiddət: standart bal 53-62 = yüngül depressiya, 63-72 = orta depressiya, 73+ = ağır depressiya"
        ],
        dimensions: [
            { name: "Emosional Simptomlar", description: "Çökkün əhval, kədər, ümidsizlik və digər emosional təcrübələr" },
            { name: "Somatik Simptomlar", description: "İştah itkisi, yuxu pozuntuları, yorğunluq və digər fiziki simptomlar" },
            { name: "Psixomotor Simptomlar", description: "Yavaş hərəkətlər, ağır düşüncə, zəif konsentrasiya" },
            { name: "Psixoloji Simptomlar", description: "Aşağı özünüqiymət, günah hissi, çarəsizlik və digər psixoloji təcrübələr" }
        ],
        notes: [
            "Bu şkala depressiv simptomları olan yetkinlər üçün uyğundur",
            "Standart bal 53-dən çox olarsa, peşəkar kömək tövsiyə olunur",
            "Bu şkala yalnız skrininq məqsədi daşıyır və peşəkar diaqnozu əvəz edə bilməz"
        ],
        references: [
            {
                text: "Zung, W. W. (1965). A self-rating depression scale. Archives of general psychiatry, 12(1), 63-70.",
                url: "https://jamanetwork.com/journals/jamapsychiatry/article-abstract/487993"
            }
        ]
    },
    questions: [
        { id: 1, content: "Özümü kefsiz və məyus hiss edirəm" },
        { id: 2, content: "Özümü ən yaxşı səhərlər hiss edirəm" },
        { id: 3, content: "Ağlamaq istəyi keçirirəm və ya ağlayıram" },
        { id: 4, content: "Gecələr yuxu ilə bağlı problemlərim var" },
        { id: 5, content: "Əvvəlki kimi yeyirəm" },
        { id: 6, content: "Hələ də cinsi həyatdan həzz alıram" },
        { id: 7, content: "Çəkidən itirdiyimi hiss edirəm" },
        { id: 8, content: "Qəbizlik problemim var" },
        { id: 9, content: "Ürəyim adətdən daha sürətli döyünür" },
        { id: 10, content: "Heç bir səbəb olmadan yorulurum" },
        { id: 11, content: "Zehnim əvvəlki kimi aydındır" },
        { id: 12, content: "Əvvəllər etdiyim işləri etmək mənə asan gəlir" },
        { id: 13, content: "Narahatam və sakit dura bilmirəm" },
        { id: 14, content: "Gələcəyə ümidlə baxıram" },
        { id: 15, content: "Adətdən daha əsəbiyəm" },
        { id: 16, content: "Qərar verməyim asandır" },
        { id: 17, content: "Faydalı və lazımlı olduğumu hiss edirəm" },
        { id: 18, content: "Həyatım kifayət qədər doludur" },
        { id: 19, content: "Ölsəydim başqalarının vəziyyəti daha yaxşı olardı deyə hiss edirəm" },
        { id: 20, content: "Əvvəllər sevdiyim işlərdən hələ də həzz alıram" }
    ],
    renderOptions: () => [
        { id: 1, content: "Vaxtın az hissəsində", value: "1" },
        { id: 2, content: "Vaxtın bəzi hissəsində", value: "2" },
        { id: 3, content: "Vaxtın çox hissəsində", value: "3" },
        { id: 4, content: "Vaxtın demək olar ki, hamısında", value: "4" }
    ]
};
