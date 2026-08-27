import { Questionnaire } from "@/types";

export const adhd: Questionnaire = {
    id: "adhd",
    title: "ADHD Özünüqiymətləndirmə Şkalası (ASRS-v1.1)",
    description: "Yetkinlərdə diqqət çatışmazlığı və hiperaktivlik pozuntusu simptomlarının qiymətləndirilməsi",
    tags: ["ADHD", "Diqqət", "Özünüqiymətləndirmə"],
    time: "5-10 dəqiqə",
    details: {
        introduction: "Yetkinlər üçün ADHD Özünüqiymətləndirmə Şkalası (ASRS-v1.1) Simptom Siyahısı Ümumdünya Səhiyyə Təşkilatı (ÜST) və psixiatr və tədqiqatçılardan ibarət Yetkin ADHD İşçi Qrupu ilə birlikdə hazırlanmışdır. Bu şkala DSM-IV meyarlarına əsaslanaraq yetkinlərdə ADHD simptomlarının tezliyini qiymətləndirmək üçün nəzərdə tutulub. Zəhmət olmasa aşağıdakı sualları cavablandırın və hər bəndi son 6 ay ərzində özünüzü necə hiss etdiyinizə və necə davrandığınıza görə qiymətləndirin.",
        questionCount: "18 sual",
        evaluationTime: "Təxminən 5-10 dəqiqə",
        instructions: "Hər sual üçün son 6 ay ərzində özünüzü necə hiss etdiyinizi və necə davrandığınızı ən yaxşı təsvir edən cavabı seçin.",
        scoringMethod: [
            "Hər sual 0-dan 4-ə qədər ballandırılır (Heç vaxt=0, Nadir hallarda=1, Bəzən=2, Tez-tez=3, Çox tez-tez=4)",
            "A hissəsi (1-6-cı suallar): skrininq sualları, 4 və ya daha çox müsbət cavab ADHD simptomlarını göstərir",
            "B hissəsi (7-18-ci suallar): əlavə simptom qiymətləndirməsi",
            "Ümumi bal aralığı: 0-72 bal",
            "Daha yüksək bal daha ağır ADHD simptomlarını göstərir"
        ],
        dimensions: [
            { name: "Diqqətsizlik", description: "Diqqəti davam etdirməkdə, təlimatlara əməl etməkdə və tapşırıqları təşkil etməkdə çətinlik" },
            { name: "Hiperaktivlik", description: "Həddindən artıq hərəkət fəallığı, narahatlıq və yerində dura bilməmə" },
            { name: "İmpulsivlik", description: "Düşünmədən hərəkət etmək, başqalarının sözünü kəsmək və gözləməkdə çətinlik" }
        ],
        notes: [
            "Bu şkala skrininq vasitəsidir və ADHD diaqnozu qoymur",
            "Bu şkalada yüksək bal alsanız, düzgün qiymətləndirmə üçün tibb mütəxəssisi ilə məsləhətləşməyi düşünün",
            "Diaqnoz üçün ADHD simptomları 7 yaşından əvvəl olmalı və bir neçə mühitdə funksional pozulmaya səbəb olmalıdır"
        ],
        references: [
            {
                text: "Kessler, R. C., Adler, L., Ames, M., Demler, O., Faraone, S., Hiripi, E., ... & Walters, E. E. (2005). The World Health Organization Adult ADHD Self-Report Scale (ASRS): a short screening scale for use in the general population. Psychological Medicine, 35(2), 245-256.",
                url: "https://www.hcp.med.harvard.edu/ncs/asrs.php"
            }
        ]
    },
    questions: [
        { id: 1, content: "Çətin hissələr artıq görüldükdən sonra layihənin son detallarını tamamlamaqda nə qədər tez-tez çətinlik çəkirsiniz?" },
        { id: 2, content: "Təşkil olunma tələb edən bir tapşırığı yerinə yetirməli olduğunuzda işləri qaydaya salmaqda nə qədər tez-tez çətinlik çəkirsiniz?" },
        { id: 3, content: "Görüşləri və ya öhdəlikləri yadda saxlamaqda nə qədər tez-tez problem yaşayırsınız?" },
        { id: 4, content: "Çox düşünmə tələb edən bir tapşırığınız olduqda, ona başlamaqdan nə qədər tez-tez qaçır və ya təxirə salırsınız?" },
        { id: 5, content: "Uzun müddət oturmalı olduğunuz zaman əl və ya ayaqlarınızla nə qədər tez-tez qurcalanırsınız?" },
        { id: 6, content: "Özünüzü nə qədər tez-tez həddindən artıq fəal və sanki bir mühərrik tərəfindən idarə olunurmuş kimi hiss edirsiniz?" },
        { id: 7, content: "Darıxdırıcı və ya çətin bir layihə üzərində işləməli olduğunuzda nə qədər tez-tez diqqətsizlik xətaları buraxırsınız?" },
        { id: 8, content: "Darıxdırıcı və ya təkrarlanan iş görəndə diqqətinizi saxlamaqda nə qədər tez-tez çətinlik çəkirsiniz?" },
        { id: 9, content: "İnsanlar sizinlə birbaşa danışsa belə, sizə dediklərinə diqqət yetirməkdə nə qədər tez-tez çətinlik çəkirsiniz?" },
        { id: 10, content: "Evdə və ya işdə əşyaları nə qədər tez-tez itirir və ya tapmaqda çətinlik çəkirsiniz?" },
        { id: 11, content: "Ətrafınızdakı fəaliyyət və ya səs-küy tərəfindən nə qədər tez-tez diqqətiniz yayınır?" },
        { id: 12, content: "İclaslarda və ya oturmalı olduğunuz digər vəziyyətlərdə yerinizdən nə qədər tez-tez qalxırsınız?" },
        { id: 13, content: "Özünüzü nə qədər tez-tez narahat və ya qurcalanan hiss edirsiniz?" },
        { id: 14, content: "Öz vaxtınız olduqda rahatlaşmaqda və istirahət etməkdə nə qədər tez-tez çətinlik çəkirsiniz?" },
        { id: 15, content: "Sosial vəziyyətlərdə özünüzü nə qədər tez-tez həddindən artıq danışan tapırsınız?" },
        { id: 16, content: "Söhbət zamanı, söhbət etdiyiniz insanlar cümlələrini bitirməmişdən əvvəl nə qədər tez-tez onları özünüz bitirirsiniz?" },
        { id: 17, content: "Növbə gözləmək tələb olunan vəziyyətlərdə növbənizi gözləməkdə nə qədər tez-tez çətinlik çəkirsiniz?" },
        { id: 18, content: "Başqaları məşğul olduqda onların sözünü nə qədər tez-tez kəsirsiniz?" }
    ],
    renderOptions: () => {
        return [
            { id: 1, content: 'Heç vaxt', value: '0' },
            { id: 2, content: 'Nadir hallarda', value: '1' },
            { id: 3, content: 'Bəzən', value: '2' },
            { id: 4, content: 'Tez-tez', value: '3' },
            { id: 5, content: 'Çox tez-tez', value: '4' },
        ];
    }
};
