import { Questionnaire } from "@/types";

export const phq9: Questionnaire = {
    id: "phq9",
    title: "PHQ-9 Xəstə Sağlamlığı Sorğusu",
    description: "Depressiya simptomlarının şiddətinin və tezliyinin qiymətləndirilməsi",
    tags: ["Depressiya", "Özünüqiymətləndirmə", "Skrininq"],
    time: "3-5 dəqiqə",
    details: {
        introduction: "Xəstə Sağlamlığı Sorğusu-9 (PHQ-9) depressiyanın qiymətləndirilməsi üçün geniş istifadə olunan skrininq vasitəsidir. Sorğu DSM-IV diaqnostik meyarlarındakı depressiya simptomlarına əsaslanan 9 bənddən ibarətdir. PHQ-9 həm depressiyanın skrininqi, həm də simptomların şiddətinin və müalicənin effektivliyinin qiymətləndirilməsi üçün istifadə edilə bilər.",
        questionCount: "9 sual",
        evaluationTime: "Adətən 3-5 dəqiqə",
        instructions: "Son 2 həftə ərzində aşağıdakı problemlərdən hər hansı biri sizi nə qədər tez-tez narahat edib? Vəziyyətinizi ən yaxşı təsvir edən variantı seçin. Hər sualın dörd variantı var: Heç vaxt, Bəzi günlər, Günlərin yarısından çoxu, Demək olar ki, hər gün.",
        scoringMethod: [
            "Ümumi bal: bütün 9 bəndin cəmi, aralıq 0-27 bal",
            "Ballandırma: Heç vaxt=0, Bəzi günlər=1, Günlərin yarısından çoxu=2, Demək olar ki, hər gün=3",
            "Şiddət: 0-4 = minimal/yoxdur, 5-9 = yüngül, 10-14 = orta, 15-19 = orta-ağır, 20-27 = ağır depressiya"
        ],
        dimensions: [
            { name: "Maraq İtkisi", description: "İşlərə qarşı az maraq və ya onlardan həzz almamaq" },
            { name: "Depressiv Əhval", description: "Özünü çökkün, məyus və ya ümidsiz hiss etmək" },
            { name: "Yuxu Problemləri", description: "Yuxuya getməkdə çətinlik, yuxunu davam etdirə bilməmək və ya həddindən artıq yatmaq" },
            { name: "Yorğunluq", description: "Yorğun hiss etmək və ya enerji azlığı" },
            { name: "İştah Dəyişiklikləri", description: "Zəif iştah və ya həddindən artıq yemək" },
            { name: "Özünə Dəyər Vermə", description: "Özü haqqında pis fikirdə olmaq və ya özünü uğursuz hesab etmək" },
            { name: "Konsentrasiya", description: "Diqqəti bir işin üzərində cəmləməkdə çətinlik" },
            { name: "Psixomotor Dəyişikliklər", description: "Yavaş hərəkət etmək/danışmaq, ya da narahat və yerində dura bilməmək" },
            { name: "Özünə Zərər Fikirləri", description: "Ölmüş olsaydınız daha yaxşı olardı düşüncəsi və ya özünə zərər vermə fikirləri" }
        ],
        notes: [
            "Bu şkala yetkinlərdə depressiv simptomların skrininqi və qiymətləndirilməsi üçün nəzərdə tutulub",
            "Ümumi bal ≥10 olduqda peşəkar qiymətləndirmə tövsiyə olunur",
            "9-cu bənd (özünə zərər fikirləri) ≥1 bal aldıqda dərhal peşəkar kömək tələb olunur",
            "Bu şkala yalnız skrininq məqsədi daşıyır və peşəkar diaqnozu əvəz edə bilməz"
        ],
        references: [
            {
                text: "Kroenke, K., Spitzer, R. L., & Williams, J. B. (2001). The PHQ‐9: validity of a brief depression severity measure. Journal of general internal medicine, 16(9), 606-613.",
                url: "https://link.springer.com/article/10.1046/j.1525-1497.2001.016009606.x"
            }
        ]
    },
    questions: [
        { id: 1, content: "İşlərə qarşı az maraq və ya onlardan həzz almamaq" },
        { id: 2, content: "Özünü çökkün, məyus və ya ümidsiz hiss etmək" },
        { id: 3, content: "Yuxuya getməkdə çətinlik, yuxunu davam etdirə bilməmək və ya həddindən artıq yatmaq" },
        { id: 4, content: "Yorğun hiss etmək və ya enerjinin az olması" },
        { id: 5, content: "Zəif iştah və ya həddindən artıq yemək" },
        { id: 6, content: "Özünüz haqqında pis fikirdə olmaq — özünüzü uğursuz hesab etmək və ya ailənizi məyus etdiyinizi düşünmək" },
        { id: 7, content: "Qəzet oxumaq və ya televizora baxmaq kimi işlərə diqqəti cəmləməkdə çətinlik" },
        { id: 8, content: "Başqalarının hiss edə biləcəyi qədər yavaş hərəkət etmək və ya danışmaq? Yaxud əksinə — adətən olduğunuzdan xeyli çox narahat və yerində dura bilməyən vəziyyətdə olmaq" },
        { id: 9, content: "Ölmüş olsaydınız daha yaxşı olardı düşüncəsi, və ya özünüzə hər hansı şəkildə zərər vermək haqqında fikirlər" }
    ],
    renderOptions: () => [
        { id: 1, content: "Heç vaxt", value: "0" },
        { id: 2, content: "Bəzi günlər", value: "1" },
        { id: 3, content: "Günlərin yarısından çoxu", value: "2" },
        { id: 4, content: "Demək olar ki, hər gün", value: "3" }
    ]
};
