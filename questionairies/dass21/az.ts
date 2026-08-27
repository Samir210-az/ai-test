import { Questionnaire } from "@/types";

export const dass21: Questionnaire = {
    id: "dass21",
    title: "DASS-21 Depressiya, Narahatlıq və Stress Şkalaları",
    description: "Depressiya, narahatlıq və stress ölçülərini qiymətləndirən kompleks şkala",
    tags: ["Depressiya", "Narahatlıq", "Stress", "Kompleks Qiymətləndirmə"],
    time: "5-8 dəqiqə",
    details: {
        introduction: "Depressiya-Narahatlıq-Stress Şkalaları-21 (DASS-21) depressiya, narahatlıq və stresin üç bir-birinə bağlı mənfi emosional vəziyyətini ölçmək üçün nəzərdə tutulmuş özünüqiymətləndirmə şkalasıdır. Şkala 21 bənddən ibarətdir, hər ölçü üçün 7 bənd nəzərdə tutulub. DASS-21 depressiya, narahatlıq və stresi effektiv şəkildə fərqləndirir və klinik və elmi-tədqiqat mühitlərində geniş istifadə olunur.",
        questionCount: "21 sual",
        evaluationTime: "Adətən 5-8 dəqiqə",
        instructions: "Zəhmət olmasa hər ifadəni oxuyun və son həftə ərzində bu ifadənin sizə nə dərəcədə uyğun gəldiyini göstərən variantı seçin. Hər sualın dörd variantı var: 0=Mənə heç uyğun gəlmədi, 1=Mənə müəyyən dərəcədə uyğun gəldi, 2=Mənə xeyli dərəcədə uyğun gəldi, 3=Mənə çox uyğun gəldi.",
        scoringMethod: [
            "Alt şkala ballandırması: Depressiya, Narahatlıq, Stress — hər birinin 7 bəndi var, hər bənd 0-3 bal",
            "Alt şkala balları DASS-42 ilə müqayisə üçün 2-yə vurulur",
            "Depressiya alt şkalası: Normal 0-9, Yüngül 10-13, Orta 14-20, Ağır 21-27, Son dərəcə ağır 28+",
            "Narahatlıq alt şkalası: Normal 0-7, Yüngül 8-9, Orta 10-14, Ağır 15-19, Son dərəcə ağır 20+",
            "Stress alt şkalası: Normal 0-14, Yüngül 15-18, Orta 19-25, Ağır 26-33, Son dərəcə ağır 34+"
        ],
        dimensions: [
            { name: "Depressiya", description: "Çökkün əhval, ümidsizlik, mənasızlıq hissi, özünü aşağılama, maraq itkisi, ləzzət ala bilməmə, süstlük" },
            { name: "Narahatlıq", description: "Avtonom sinir sisteminin oyanması, əzələ gərginliyi, situasiyaya bağlı narahatlıq və subyektiv narahatlıq təcrübəsi" },
            { name: "Stress", description: "Davamlı gərginlik, əsəbilik, həddindən artıq reaksiya, səbirsizlik, rahatlaşa bilməmə, gərginlik, asanlıqla qıcıqlanma" }
        ],
        notes: [
            "Bu şkala yetkinlərdə emosional vəziyyətin qiymətləndirilməsi üçün uyğundur",
            "Hər hansı ölçüdə yüksək bal olarsa, peşəkar psixoloji kömək tövsiyə olunur",
            "Bu şkala yalnız skrininq məqsədi daşıyır və peşəkar diaqnozu əvəz edə bilməz"
        ],
        references: [
            {
                text: "Lovibond, S. H., & Lovibond, P. F. (1995). Manual for the Depression Anxiety Stress Scales. Psychology Foundation.",
                url: "https://www.psychology.org.au"
            }
        ]
    },
    questions: [
        // Depressiya ölçüsü (3, 5, 10, 13, 16, 17, 21)
        // Narahatlıq ölçüsü (2, 4, 7, 9, 15, 19, 20)
        // Stress ölçüsü (1, 6, 8, 11, 12, 14, 18)
        { id: 1, content: "Sakitləşməkdə çətinlik çəkdim" },
        { id: 2, content: "Ağzımın quruduğunu hiss etdim" },
        { id: 3, content: "Heç bir müsbət hiss keçirə bilmədim" },
        { id: 4, content: "Nəfəs almaqda çətinlik yaşadım (məsələn, həddindən artıq tez nəfəs almaq, nəfəs darlığı)" },
        { id: 5, content: "Hər hansı bir işi görmək üçün təşəbbüs göstərməkdə çətinlik çəkdim" },
        { id: 6, content: "Vəziyyətlərə həddindən artıq reaksiya verməyə meylli oldum" },
        { id: 7, content: "Titrəmə yaşadım (məsələn, əllərdə)" },
        { id: 8, content: "Çoxlu əsəb enerjisi sərf etdiyimi hiss etdim" },
        { id: 9, content: "Panikaya düşə biləcəyim və özümü gülünc vəziyyətə sala biləcəyim situasiyalardan narahat oldum" },
        { id: 10, content: "Gözləyəcəyim heç nə olmadığını hiss etdim" },
        { id: 11, content: "Özümü əsəbi hiss etdim" },
        { id: 12, content: "Rahatlaşmaqda çətinlik çəkdim" },
        { id: 13, content: "Özümü çökkün və məyus hiss etdim" },
        { id: 14, content: "Etdiyim işi davam etdirməyimə mane olan hər hansı bir şeyə dözümsüz oldum" },
        { id: 15, content: "Panikaya yaxın olduğumu hiss etdim" },
        { id: 16, content: "Heç nəyə həvəs göstərə bilmədim" },
        { id: 17, content: "Bir insan olaraq çox dəyərli olmadığımı hiss etdim" },
        { id: 18, content: "Kifayət qədər incə/toxunulan olduğumu hiss etdim" },
        { id: 19, content: "Fiziki gərginlik olmadan ürəyimin döyüntüsünü hiss etdim" },
        { id: 20, content: "Heç bir əsaslı səbəb olmadan qorxu hiss etdim" },
        { id: 21, content: "Həyatın mənasız olduğunu hiss etdim" }
    ],
    renderOptions: () => [
        { id: 1, content: "Mənə heç uyğun gəlmədi", value: "0" },
        { id: 2, content: "Mənə müəyyən dərəcədə uyğun gəldi", value: "1" },
        { id: 3, content: "Mənə xeyli dərəcədə uyğun gəldi", value: "2" },
        { id: 4, content: "Mənə çox uyğun gəldi", value: "3" }
    ]
};
