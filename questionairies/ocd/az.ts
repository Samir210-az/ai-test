import { Questionnaire } from "@/types";

export const ocd: Questionnaire = {
    id: "ocd",
    title: "Yale-Brown Obsessiv-Kompulsiv Şkalası (Y-BOCS)",
    description: "Obsessiv-kompulsiv simptomların və onların şiddətinin qiymətləndirilməsi",
    tags: ["Obsessiv", "Özünüqiymətləndirmə", "Sadə"],
    time: "5-10 dəqiqə",
    details: {
        introduction: "Yale-Brown Obsessiv-Kompulsiv Şkalası (Y-BOCS) Goodman və həmkarları tərəfindən DSM-III-R diaqnostik meyarlarına əsasən obsessiv-kompulsiv simptomların şiddətini ölçmək üçün xüsusi olaraq hazırlanmış şkaladır və obsessiv-kompulsiv pozuntunun klinik qiymətləndirilməsində istifadə olunan əsas vasitələrdən biridir. Şkala test edilən şəxsin obsessiv fikirlərini və kompulsiv davranışlarını əks etdirən 10 bənddən ibarətdir. Zəhmət olmasa son həftə ərzindəki hisslərinizə əsaslanaraq seçim edin.",
        questionCount: "10 əsas sual",
        evaluationTime: "Təxminən 5-10 dəqiqə",
        instructions: "Aşağıdakı suallar obsessiv-kompulsiv simptomlarınızla bağlıdır. Zəhmət olmasa son həftə ərzindəki vəziyyətinizi ən yaxşı təsvir edən variantı seçin.",
        scoringMethod: [
            "Hər sual 0-dan 4-ə qədər ballandırılır.",
            "0-7 bal: Normal və ya subklinik vəziyyət.",
            "8-15 bal: Yüngül obsessiv-kompulsiv simptomlar.",
            "16-23 bal: Orta dərəcəli obsessiv-kompulsiv simptomlar.",
            "24-31 bal: Ağır obsessiv-kompulsiv simptomlar.",
            "32-40 bal: Ekstremal obsessiv-kompulsiv simptomlar."
        ],
        dimensions: [
            { name: "Obsessiv Fikirlər", description: "İstənilməyən, təkrarlanan və narahatlıq yaradan fikirlər, təsvirlər və ya təkanlar." },
            { name: "Kompulsiv Davranışlar", description: "Narahatlığı azaltmaq üçün icra edilən təkrarlanan davranışlar və ya zehni əməllər." }
        ],
        notes: [
            "Bu şkala obsessiv-kompulsiv simptomların şiddətini qiymətləndirir, obsessiv-kompulsiv pozuntunun diaqnozunu qoymur.",
            "Yüksək bal aldıqda, zəhmət olmasa diaqnoz və müalicə üçün peşəkar psixiatr və ya psixoloqla məsləhətləşin."
        ],
        references: [
            {
                text: "Goodman, W. K., Price, L. H., Rasmussen, S. A., Mazure, C., Fleischmann, R. L., Hill, C. L., ... & Charney, D. S. (1989). The Yale-Brown Obsessive Compulsive Scale: I. Development, use, and reliability. Archives of General Psychiatry, 46(11), 1006-1011.",
                url: "https://osf.io/tn2vg/download"
            }
        ]
    },
    questions: [
        { id: 1, content: "Obsessiv fikirlərə nə qədər vaxt sərf edirsiniz?" },
        { id: 2, content: "Obsessiv fikirlər sosial və ya iş fəaliyyətinizə nə dərəcədə mane olur?" },
        { id: 3, content: "Obsessiv fikirləriniz sizə nə qədər narahatlıq yaradır?" },
        { id: 4, content: "Obsessiv fikirlərə müqavimət göstərmək üçün nə qədər səy göstərirsiniz?" },
        { id: 5, content: "Obsessiv fikirləriniz üzərində nə qədər nəzarətiniz var?" },
        { id: 6, content: "Kompulsiv davranışları icra etməyə nə qədər vaxt sərf edirsiniz?" },
        { id: 7, content: "Kompulsiv davranışlar sosial və ya iş fəaliyyətinizə nə dərəcədə mane olur?" },
        { id: 8, content: "Kompulsiv davranışları icra etməkdən məhrum olsanız nə qədər narahat olarsınız?" },
        { id: 9, content: "Kompulsiv davranışlara müqavimət göstərmək üçün nə qədər səy göstərirsiniz?" },
        { id: 10, content: "Kompulsiv davranışlarınız üzərində nə qədər nəzarətiniz var?" }
    ],
    renderOptions: (id: number) => {
        // Common severity options (time occupied / interference / distress)
        const severityOptions = [
            { id: 1, content: 'Yoxdur', value: '0' },
            { id: 2, content: 'Yüngül', value: '1' },
            { id: 3, content: 'Orta', value: '2' },
            { id: 4, content: 'Ağır', value: '3' },
            { id: 5, content: 'Ekstremal', value: '4' },
        ];

        // Resistance degree (items 4 & 9)
        const resistanceOptions = [
            { id: 1, content: 'Həmişə müqavimət göstərə bilirəm', value: '0' },
            { id: 2, content: 'Əksər hallarda müqavimət göstərə bilirəm', value: '1' },
            { id: 3, content: 'Bəzən müqavimət göstərə bilirəm', value: '2' },
            { id: 4, content: 'Nadir hallarda müqavimət göstərə bilirəm', value: '3' },
            { id: 5, content: 'Müqavimət göstərə bilmirəm', value: '4' },
        ];

        // Control ability (items 5 & 10)
        const controlOptions = [
            { id: 1, content: 'Tam nəzarət', value: '0' },
            { id: 2, content: 'Çox nəzarət', value: '1' },
            { id: 3, content: 'Müəyyən nəzarət', value: '2' },
            { id: 4, content: 'Az nəzarət', value: '3' },
            { id: 5, content: 'Nəzarət yoxdur', value: '4' },
        ];

        switch (id) {
            case 4:
            case 9:
                return resistanceOptions;
            case 5:
            case 10:
                return controlOptions;
            default:
                return severityOptions;
        }
    }
};
