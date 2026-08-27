import { Questionnaire } from "@/types";

export const npd: Questionnaire = {
    id: "npd",
    title: "Narsissik Şəxsiyyət Inventarı (NPI-16)",
    description: "Narsissik şəxsiyyət xüsusiyyətlərinin qiymətləndirilməsi",
    tags: ["Şəxsiyyət", "Narsissizm", "Özünüqiymətləndirmə"],
    time: "5-10 dəqiqə",
    details: {
        introduction: "Narsissik Şəxsiyyət İnventarı (NPI-16) klinik olmayan populyasiyalarda narsissik xüsusiyyətləri ölçmək üçün hazırlanmış psixoloji vasitədir. Bu qısaldılmış versiya narsissik şəxsiyyət xüsusiyyətlərinin müxtəlif aspektlərini qiymətləndirən 16 məcburi seçim bəndindən ibarətdir. Qeyd edək ki, bu, şəxsiyyət xüsusiyyətlərini anlamaq üçün tədqiqat vasitəsidir və klinik diaqnoz üçün nəzərdə tutulmayıb.",
        questionCount: "16 sual",
        evaluationTime: "Təxminən 5-10 dəqiqə",
        instructions: "Aşağıdakı hər cüt ifadədən özünüzü ən yaxşı təsvir edəni və ya özünüz haqqında hisslərinizə ən yaxın olanı seçin.",
        scoringMethod: [
            "Hər sual iki seçim təklif edir — sizi ən yaxşı təsvir edəni seçin",
            "Narsissik cavablar 1 bal, narsissik olmayan cavablar isə 0 bal alır",
            "Ümumi bal aralığı: 0-16 bal",
            "Daha yüksək bal daha çox narsissik xüsusiyyəti göstərir",
            "Ümumi populyasiyada orta bal adətən 2-8 aralığındadır"
        ],
        dimensions: [
            { name: "Liderlik/Nüfuz", description: "Başqalarına rəhbərlik etmək və onlar üzərində nüfuza sahib olmaq istəyi" },
            { name: "Böyüklük İddiası/Nümayişkaranlıq", description: "Başqalarından diqqət və heyranlıq tələbatı" },
            { name: "Haqq İddiası", description: "Xüsusi rəftar və imtiyazlara layiq olduğuna inam" }
        ],
        notes: [
            "Bu inventar narsissik xüsusiyyətləri klinik pozuntu kimi deyil, davamlı spektr üzərində ölçür",
            "Narsissik xüsusiyyətlər hər kəsdə müəyyən dərəcədə mövcuddur və müəyyən kontekstlərdə adaptiv ola bilər",
            "Yüksək bal mütləq şəxsiyyət pozuntusunu göstərmir",
            "Bu vasitə yalnız təhsil və tədqiqat məqsədi daşıyır, klinik diaqnoz üçün deyil"
        ],
        references: [
            {
                text: "Ames, D. R., Rose, P., & Anderson, C. P. (2006). The NPI-16 as a short measure of narcissism. Journal of Research in Personality, 40(4), 440-450.",
                url: "https://doi.org/10.1016/j.jrp.2005.03.002"
            }
        ]
    },
    questions: [
        { id: 1, content: "Sizi ən yaxşı təsvir edən ifadəni seçin:" },
        { id: 2, content: "Sizi ən yaxşı təsvir edən ifadəni seçin:" },
        { id: 3, content: "Sizi ən yaxşı təsvir edən ifadəni seçin:" },
        { id: 4, content: "Sizi ən yaxşı təsvir edən ifadəni seçin:" },
        { id: 5, content: "Sizi ən yaxşı təsvir edən ifadəni seçin:" },
        { id: 6, content: "Sizi ən yaxşı təsvir edən ifadəni seçin:" },
        { id: 7, content: "Sizi ən yaxşı təsvir edən ifadəni seçin:" },
        { id: 8, content: "Sizi ən yaxşı təsvir edən ifadəni seçin:" },
        { id: 9, content: "Sizi ən yaxşı təsvir edən ifadəni seçin:" },
        { id: 10, content: "Sizi ən yaxşı təsvir edən ifadəni seçin:" },
        { id: 11, content: "Sizi ən yaxşı təsvir edən ifadəni seçin:" },
        { id: 12, content: "Sizi ən yaxşı təsvir edən ifadəni seçin:" },
        { id: 13, content: "Sizi ən yaxşı təsvir edən ifadəni seçin:" },
        { id: 14, content: "Sizi ən yaxşı təsvir edən ifadəni seçin:" },
        { id: 15, content: "Sizi ən yaxşı təsvir edən ifadəni seçin:" },
        { id: 16, content: "Sizi ən yaxşı təsvir edən ifadəni seçin:" }
    ],
    renderOptions: (id: number) => {
        const optionPairs = [
            [
                { id: 1, content: "İnsanlara təsir etmək üçün təbii istedadım var.", value: "1" },
                { id: 2, content: "İnsanlara təsir etməkdə yaxşı deyiləm.", value: "0" }
            ],
            [
                { id: 1, content: "Təvazökarlıq mənə yaraşmır.", value: "1" },
                { id: 2, content: "Təvazökarlıq mənə yaraşır.", value: "0" }
            ],
            [
                { id: 1, content: "Meydan oxusalar demək olar ki, hər şeyi edərəm.", value: "1" },
                { id: 2, content: "Mən kifayət qədər ehtiyatlı bir insanam.", value: "0" }
            ],
            [
                { id: 1, content: "İnsanlar mənə iltifat edəndə bəzən utanıram.", value: "0" },
                { id: 2, content: "Yaxşı olduğumu bilirəm, çünki hər kəs mənə bunu deyir.", value: "1" }
            ],
            [
                { id: 1, content: "Dünyaya rəhbərlik etmək fikri məni çox qorxudur.", value: "0" },
                { id: 2, content: "Dünyaya mən rəhbərlik etsəydim, daha yaxşı bir yer olardı.", value: "1" }
            ],
            [
                { id: 1, content: "Adətən hər şeydən sözlə çıxa bilirəm.", value: "1" },
                { id: 2, content: "Davranışımın nəticələrini qəbul etməyə çalışıram.", value: "0" }
            ],
            [
                { id: 1, content: "Kütlə içində qarışmağı üstün tuturam.", value: "0" },
                { id: 2, content: "Diqqət mərkəzində olmağı sevirəm.", value: "1" }
            ],
            [
                { id: 1, content: "Mən uğur qazanacam.", value: "1" },
                { id: 2, content: "Uğur haqqında çox narahat deyiləm.", value: "0" }
            ],
            [
                { id: 1, content: "Mən əksər insanlardan nə yaxşıyam, nə də pis.", value: "0" },
                { id: 2, content: "Xüsusi bir insan olduğumu düşünürəm.", value: "1" }
            ],
            [
                { id: 1, content: "Yaxşı bir lider ola biləcəyimdən əmin deyiləm.", value: "0" },
                { id: 2, content: "Özümü yaxşı bir lider kimi görürəm.", value: "1" }
            ],
            [
                { id: 1, content: "Mən qətiyyətliyəm.", value: "1" },
                { id: 2, content: "Kaş daha qətiyyətli olaydım.", value: "0" }
            ],
            [
                { id: 1, content: "Başqa insanlar üzərində nüfuza sahib olmağı sevirəm.", value: "1" },
                { id: 2, content: "Əmr almağa etirazım yoxdur.", value: "0" }
            ],
            [
                { id: 1, content: "İnsanları idarə etmək mənim üçün asandır.", value: "1" },
                { id: 2, content: "Özümü insanları idarə edərkən tapdıqda bundan xoşlanmıram.", value: "0" }
            ],
            [
                { id: 1, content: "Mənə göstərilməli olan hörmətə israr edirəm.", value: "1" },
                { id: 2, content: "Adətən layiq olduğum hörməti alıram.", value: "0" }
            ],
            [
                { id: 1, content: "Bədənimi xüsusilə nümayiş etdirməyi sevmirəm.", value: "0" },
                { id: 2, content: "Bədənimi nümayiş etdirməyi sevirəm.", value: "1" }
            ],
            [
                { id: 1, content: "İnsanları kitab kimi oxuya bilirəm.", value: "1" },
                { id: 2, content: "İnsanları başa düşmək bəzən çətindir.", value: "0" }
            ]
        ];

        return optionPairs[id - 1] || [];
    }
};
