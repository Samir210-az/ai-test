import { Questionnaire } from "@/types";

export const bdi2: Questionnaire = {
    id: "bdi2",
    title: "BDI-II Beck Depressiya İnventarı",
    description: "Depressiya simptomlarının qiymətləndirilməsi üçün qızıl standart vasitə",
    tags: ["Depressiya", "Özünüqiymətləndirmə", "Klinik Qiymətləndirmə"],
    time: "5-10 dəqiqə",
    details: {
        introduction: "Beck Depressiya İnventarı-II (BDI-II) depressiyanın skrininqi və şiddətinin qiymətləndirilməsi üçün ən geniş istifadə olunan vasitələrdən biridir. Şkala depressiyanın konkret simptomunu təsvir edən 21 bənddən ibarətdir və DSM-IV diaqnostik meyarlarına əsaslanaraq hazırlanıb. BDI-II yüksək etibarlılıq və validlik göstəricilərinə malikdir və depressiya simptomlarının qiymətləndirilməsi üçün qızıl standart hesab olunur.",
        questionCount: "21 sual",
        evaluationTime: "Adətən 5-10 dəqiqə",
        instructions: "Bu sorğu 21 ifadə qrupundan ibarətdir. Zəhmət olmasa hər qrupu diqqətlə oxuyun, sonra bu gün daxil olmaqla son iki həftə ərzində özünüzü necə hiss etdiyinizi ən yaxşı təsvir edən bir ifadəni seçin. Hər qrup şiddətin artması sırası ilə 0-dan 3-ə qədər ballandırılır.",
        scoringMethod: [
            "Ümumi bal: bütün 21 bəndin cəmi, aralıq 0-63 bal",
            "Şiddət: 0-13 = minimal/yoxdur, 14-19 = yüngül depressiya, 20-28 = orta depressiya, 29-63 = ağır depressiya",
            "Klinik əhəmiyyət: bal ≥14 əlavə qiymətləndirmə tələb edir, ≥29 dərhal diqqət tələb edən ağır depressiyanı göstərir"
        ],
        dimensions: [
            { name: "Emosional Simptomlar", description: "Kədər, ümidsizlik, ağlamaq, əsəbilik və digər emosional təzahürlər" },
            { name: "Koqnitiv Simptomlar", description: "Özünütənqid, təqsirkarlıq, qərarsızlıq, konsentrasiya problemləri" },
            { name: "Somatik Simptomlar", description: "Yorğunluq, yuxu problemləri, iştah dəyişiklikləri, cinsi marağın azalması" },
            { name: "Davranış Simptomları", description: "Sosial təcridolma, maraq itkisi, iş qabiliyyətinin azalması" }
        ],
        notes: [
            "Bu şkala 13 yaşdan yuxarı yeniyetmələr və yetkinlər üçün nəzərdə tutulub",
            "Ümumi bal ≥29 olduqda və ya intihar fikirləri mövcud olduqda dərhal peşəkar kömək tələb olunur",
            "Bu şkala yalnız skrininq məqsədi daşıyır və peşəkar diaqnozu əvəz edə bilməz"
        ],
        references: [
            {
                text: "Beck, A. T., Steer, R. A., & Brown, G. K. (1996). Manual for the Beck Depression Inventory-II. San Antonio, TX: Psychological Corporation.",
                url: "https://www.pearsonassessments.com"
            }
        ]
    },
    questions: [
        { id: 1, content: "Kədər" },
        { id: 2, content: "Pessimizm" },
        { id: 3, content: "Keçmiş Uğursuzluqlar" },
        { id: 4, content: "Həzz İtkisi" },
        { id: 5, content: "Təqsirkarlıq Hissi" },
        { id: 6, content: "Cəzalandırılma Hissi" },
        { id: 7, content: "Özündən Narazılıq" },
        { id: 8, content: "Özünütənqid" },
        { id: 9, content: "İntihar Fikirləri və ya Arzuları" },
        { id: 10, content: "Ağlamaq" },
        { id: 11, content: "Narahatlıq (Ajitasiya)" },
        { id: 12, content: "Maraq İtkisi" },
        { id: 13, content: "Qərarsızlıq" },
        { id: 14, content: "Dəyərsizlik Hissi" },
        { id: 15, content: "Enerji İtkisi" },
        { id: 16, content: "Yuxu Rejimində Dəyişikliklər" },
        { id: 17, content: "Əsəbilik" },
        { id: 18, content: "İştahda Dəyişikliklər" },
        { id: 19, content: "Konsentrasiya Çətinliyi" },
        { id: 20, content: "Yorğunluq" },
        { id: 21, content: "Cinsi Marağın İtkisi" }
    ],
    renderOptions: (id: number) => {
        // Return different options based on different items
        switch (id) {
            case 1: // Sadness
                return [
                    { id: 1, content: "Özümü kədərli hiss etmirəm", value: "0" },
                    { id: 2, content: "Vaxtımın çoxunda özümü kədərli hiss edirəm", value: "1" },
                    { id: 3, content: "Həmişə kədərliyəm", value: "2" },
                    { id: 4, content: "O qədər kədərli və ya bədbəxtəm ki, buna dözə bilmirəm", value: "3" }
                ];
            case 2: // Pessimism
                return [
                    { id: 1, content: "Gələcəyim barədə ürəkdən düşkün deyiləm", value: "0" },
                    { id: 2, content: "Gələcəyim barədə əvvəlkindən daha çox ürəkdən düşkünəm", value: "1" },
                    { id: 3, content: "İşlərin mənim üçün yaxşı nəticələnəcəyini gözləmirəm", value: "2" },
                    { id: 4, content: "Gələcəyimin ümidsiz olduğunu və yalnız pisləşəcəyini hiss edirəm", value: "3" }
                ];
            case 9: // Suicidal Thoughts or Wishes
                return [
                    { id: 1, content: "Özümü öldürmək haqqında heç bir fikrim yoxdur", value: "0" },
                    { id: 2, content: "Özümü öldürmək haqqında fikirlərim var, lakin bunu həyata keçirməzdim", value: "1" },
                    { id: 3, content: "Özümü öldürmək istərdim", value: "2" },
                    { id: 4, content: "İmkanım olsa özümü öldürərdim", value: "3" }
                ];
            default:
                // Generic option template
                return [
                    { id: 1, content: "Simptom yoxdur", value: "0" },
                    { id: 2, content: "Yüngül", value: "1" },
                    { id: 3, content: "Orta", value: "2" },
                    { id: 4, content: "Ağır", value: "3" }
                ];
        }
    }
};
