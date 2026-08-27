import { Questionnaire } from "@/types";

export const isi: Questionnaire = {
    id: "isi",
    title: "ISI Yuxusuzluq Şiddəti İndeksi",
    description: "Yuxusuzluğun şiddətinin və gündəlik həyata təsirinin qiymətləndirilməsi",
    tags: ["Yuxusuzluq", "Yuxu Keyfiyyəti", "Özünüqiymətləndirmə"],
    time: "2-3 dəqiqə",
    details: {
        introduction: "Yuxusuzluq Şiddəti İndeksi (ISI) yuxusuzluğun şiddətini qiymətləndirmək üçün istifadə olunan qısa, effektiv özünüqiymətləndirmə sorğusudur. Şkala 7 bənddən ibarətdir və yuxusuzluğun şəxsin gündəlik funksionallığına təsirini sürətlə qiymətləndirməyə imkan verir; klinik və elmi-tədqiqat mühitində yuxusuzluğun qiymətləndirilməsi üçün geniş istifadə olunur.",
        questionCount: "7 sual",
        evaluationTime: "Adətən 2-3 dəqiqə",
        instructions: "Zəhmət olmasa son iki həftə ərzindəki yuxu vəziyyətinizi, faktiki vəziyyətinizi ən yaxşı təsvir edən variantı seçərək qiymətləndirin. Hər sualın fərqli ballandırma meyarları var.",
        scoringMethod: [
            "Ümumi bal: bütün 7 bəndin cəmi, aralıq 0-28 bal",
            "Şiddət: 0-7 = klinik əhəmiyyətli yuxusuzluq yoxdur, 8-14 = subklinik yuxusuzluq, 15-21 = orta yuxusuzluq, 22-28 = ağır yuxusuzluq",
            "Klinik əhəmiyyət: ümumi bal ≥8 yuxusuzluq problemini göstərir, ≥15 peşəkar kömək axtarmaq tövsiyə olunur"
        ],
        dimensions: [
            { name: "Yuxuya Getmə Çətinliyi", description: "Yatağa girdikdən sonra yuxuya getmək üçün lazım olan uzun müddət" },
            { name: "Yuxunu Davam Etdirmə Çətinliyi", description: "Tez-tez oyanmaq və yenidən yuxuya getməkdə çətinlik" },
            { name: "Erkən Oyanma", description: "İstənilən vaxtdan tez oyanmaq və yenidən yuxuya gedə bilməmək" },
            { name: "Yuxudan Məmnunluq", description: "Hazırkı yuxu rejimindən ümumi məmnunluq" },
            { name: "Gündüz Fəaliyyəti", description: "Yuxusuzluğun gündüz həyat keyfiyyətinə və fəaliyyətə təsiri" },
            { name: "Başqalarının Müşahidəsi", description: "Başqalarının yuxu probleminizi nə dərəcədə fərq etməsi" },
            { name: "Narahatlıq Səviyyəsi", description: "Hazırkı yuxu problemi ilə bağlı narahatlıq və narahatlıq dərəcəsi" }
        ],
        notes: [
            "Bu şkala yetkinlərdə yuxusuzluq probleminin qiymətləndirilməsi üçün uyğundur",
            "Ümumi bal ≥15 olduqda yuxu mütəxəssisi ilə məsləhətləşmə tövsiyə olunur",
            "Bu şkala yalnız skrininq məqsədi daşıyır və peşəkar diaqnozu əvəz edə bilməz"
        ],
        references: [
            {
                text: "Bastien, C. H., Vallières, A., & Morin, C. M. (2001). Validation of the Insomnia Severity Index as an outcome measure for insomnia research. Sleep medicine, 2(4), 297-307.",
                url: "https://pubmed.ncbi.nlm.nih.gov/11438246/"
            }
        ]
    },
    questions: [
        { id: 1, content: "Yuxuya getmə çətinliyinin şiddəti" },
        { id: 2, content: "Yuxunu davam etdirmə çətinliyinin şiddəti" },
        { id: 3, content: "Erkən oyanma probleminin şiddəti" },
        { id: 4, content: "Hazırkı yuxu rejiminizdən nə dərəcədə məmnunsunuz?" },
        { id: 5, content: "Yuxu probleminizin gündəlik fəaliyyətinizə nə dərəcədə mane olduğunu düşünürsünüz?" },
        { id: 6, content: "Yuxu probleminizin həyat keyfiyyətinizə zərər verdiyini başqalarının nə dərəcədə fərq etdiyini düşünürsünüz?" },
        { id: 7, content: "Hazırkı yuxu probleminizlə bağlı nə qədər narahatsınız/nigaransınız?" }
    ],
    renderOptions: (id: number) => {
        switch (id) {
            case 1:
            case 2:
            case 3:
                return [
                    { id: 1, content: "Yoxdur", value: "0" },
                    { id: 2, content: "Yüngül", value: "1" },
                    { id: 3, content: "Orta", value: "2" },
                    { id: 4, content: "Ağır", value: "3" },
                    { id: 5, content: "Çox ağır", value: "4" }
                ];
            case 4:
                return [
                    { id: 1, content: "Çox məmnunam", value: "0" },
                    { id: 2, content: "Məmnunam", value: "1" },
                    { id: 3, content: "Orta dərəcədə məmnunam", value: "2" },
                    { id: 4, content: "Narazıyam", value: "3" },
                    { id: 5, content: "Çox narazıyam", value: "4" }
                ];
            case 5:
            case 6:
            case 7:
                return [
                    { id: 1, content: "Heç", value: "0" },
                    { id: 2, content: "Bir az", value: "1" },
                    { id: 3, content: "Müəyyən qədər", value: "2" },
                    { id: 4, content: "Xeyli", value: "3" },
                    { id: 5, content: "Çox", value: "4" }
                ];
            default:
                return [
                    { id: 1, content: "Yoxdur", value: "0" },
                    { id: 2, content: "Yüngül", value: "1" },
                    { id: 3, content: "Orta", value: "2" },
                    { id: 4, content: "Ağır", value: "3" },
                    { id: 5, content: "Çox ağır", value: "4" }
                ];
        }
    }
};
