import { useState } from "react";

import AppContext from "./AppContext";

const AppState = (props) => {
  const [isHindi, setIsHindi] = useState(false);
  const changeLanguage = () => {
    setIsHindi(!isHindi);
  };
  const dataEnglish = {
    navTitle: "UNNATI",
    logout: "Logout",
    service: "service",
    services: "Services",
    maidService: "Maid",
    carpenterService: "Carpenter",
    electricianService: "Electrician",
    plumberService: "Plumber",
    painterService: "Painter",
    chefService: "Chef",
    homeTitle: "UNNATI - THE SERVICE PROVIDER",
    homeDivP: "See the requirements of our customers",
    exploreNow: "Explore Now",
    homeDivC: [
      "Welcome to UNNATI for the unnati of local workers and for people who need workers.",
      "Here, we provide various services of and for localworkers for our day to day services like maids, plumbers,carpenters, electricians, painters etc.",
    ],
    explore: "Explore",
    maidText:
      "Want to make your home clean and hygienic. Let our reliable maids help you with your household works. Click below to contact them for cleaning , washing dishes etc",
    carpenterText:
      "Want anyone to construct, repair or install frameworks and structure for your home . Click below to contact our hardworking cooperative carpenters",
    electricianText:
      " Want to correct your lose wires . Click below to contact our electricians for all kinds of electrical work like fitting,rewiring, repairing, installing etc.",
    plumberText:
      "Want to correct the leaks . Click below to contact our plumbers to install or repair pipes and fixtures carrying water, gas or any fluid.",
    painterText:
      "  Want to fix your walls and make your place more lively filled with colors. Contact our painters to apply paints and other decorative finishes.",
    chefText:
      "   Want to have mouth watering food. Contact our cooks and chefs to have healthy, nutritious and delicious meals.",
    providerDataTitle: "List of Service Providers for",
    notProviderData: "No data Available at the moment!",
    loading: "Loading",
    fullName: "Full Name",
    email: "Email",
    address: "Address",
    availability: "Availability",
    experience: "Experience",
    rating: "Rating",
    action: "Action",
    connect: "connect",
    sent: "sent",
    notFoundProvider: [
      "Not found suitable provider?",
      "Post your requirement now:",
    ],
    postRequirement: "Post Requirement",
    requirementOf: "Requirement Of:",
    requiredExperience: "Required Experience",
    preferredTime: "Preferred Time:",
    select: "select",
    submit: "Submit",
    cancel: "Cancel",
    morningOnly: "Morning Only",
    eveningOnly: "Evening Only",
    morningEvening: "Morning/Evening",
    allDay: "All Day",
    anytime: "Anytime",
    requirementSavedSuccess: "Requirement saved successfully.",
    requirementSavedError:
      "Failed to save requirement. Please try again later.",
    aboutTitle: "Your Information:",
    name: "Name",
    mobileNumber: "Mobile Number",
    myActivitiesTitle: "Requirements Posted:",
    myActivitiesEmpty: "You haven't posted any requirement yet",
    serviceRequired: "Service Required",
    dateOfPosting: "Date of posting",
    delete: "delete",
    connectionRequestTitle: "List of connection requests you received",
    requirementPostedOn: "Requirement Posted On",
    provider: "Provider's",
    wishToConnect: "Wish to connect?",
    accept: "accept",
    reject: "reject",
    giveFeedback: "give feedback",
    connectionRequestSentTitle: "List of connection requests you have sent",
    customer: "Customer's",
    sentRequestSuccess: [
      "You have successfully accepted the request.",
      "Contact details of the provider will be sent to your e-mail soon.",
      "Your contact details will be shared with the user soon.",
      "Thank you for your visit.",
    ],
    feedbackSuccess: [
      "Thank you for your time. Your feedback is valuable to us.",
      "Have a nice day.",
    ],
    close: "Close",
    feedback: "Feedback",
    feedbackQuestions: [
      "How was your experience?",
      "How would you describe the service of our provider?",
      "Anything else you want to share?",
    ],
    change: "change",
    updateAddressTitle: "Update Address",
    enterNewAddress: "Enter new address:",
    requirementsTitle:"List of customer requirements"
  };
  const dataHindi = {
    navTitle: "उन्नति",
    logout: "लॉग आउट",
    service: "सेवा",
    services: "सेवाएँ",
    maidService: "नौकरानी",
    carpenterService: "बढ़ई",
    electricianService: "बिजली मिस्त्री",
    plumberService: "प्लंबर",
    painterService: "पेंटर",
    chefService: "बावर्ची",
    homeTitle: "उन्नति - एक सेवा प्रदाता",
    homeDivP: "हमारे ग्राहकों की आवश्यकताओं को देखें",
    exploreNow: "अभी एक्सप्लोर करें",
    homeDivC: [
      "स्थानीय श्रमिकों की उन्नति के लिए और उन लोगों के लिए जिन्हें श्रमिकों की आवश्यकता है,उन्नति में आपका स्वागत है |",
      "यहां, हम स्थानीय के लिए और उसके लिए विभिन्न सेवाएं प्रदान करते हैं नौकरानियों, प्लंबर, जैसे हमारे दैनिक सेवाओं के लिए कर्मचारी बढ़ई, बिजली मिस्त्री, चित्रकार आदि।",
    ],
    explore: "अन्वेषण",
    maidText:
      "अपने घर को साफ और स्वच्छ बनाना चाहते हैं। हमारे विश्वसनीय नौकरानियों को रहने दो आपके घरेलू कामों में आपकी मदद करते हैं। उनसे संपर्क करने के लिए नीचे क्लिक करें सफाई, बर्तन धोने आदि के लिए",
    carpenterText:
      "चाहते हैं कि कोई भी ढांचे का निर्माण, मरम्मत या स्थापित करे और आपके घर के लिए संरचना। हमारे मेहनती से संपर्क करने के लिए नीचे क्लिक करें सहकारी बढ़ई|",
    electricianText:
      " अपने खोए हुए तारों को ठीक करना चाहते हैं। हमसे संपर्क करने के लिए नीचे क्लिक करें बिजली के सभी प्रकार के काम के लिए इलेक्ट्रीशियन जैसे फिटिंग, रीवायरिंग, मरम्मत, स्थापना इत्यादि।",
    plumberText:
      "लीकेज ठीक करना चाहते हैं। हमारे प्लंबर से संपर्क करने के लिए नीचे क्लिक करें पानी, गैस या कोई भी ले जाने वाले पाइप और जुड़नार स्थापित या मरम्मत करें तरल।",
    painterText:
      "अपनी दीवारों को ठीक करना चाहते हैं और अपनी जगह को अधिक जीवंत बनाना चाहते हैं रंग की। पेंट और अन्य सजावटी सामग्री लगाने के लिए हमारे पेंटर्स से संपर्क करें खत्म।",
    chefText:
      "मुंह में पानी लाने वाला खाना चाहते हैं। हमारे रसोइयों और रसोइयों से संपर्क करें स्वस्थ, पौष्टिक और स्वादिष्ट भोजन करें।",
    providerDataTitle: "के लिए सेवा प्रदाताओं की सूची ",
    notProviderData: "फिलहाल कोई डेटा उपलब्ध नहीं है!",
    loading: "लोड हो रहा है",
    fullName: "पूरा नाम",
    email: "ईमेल",
    address: "पता",
    availability: "उपलब्धता",
    experience: "अनुभव",
    rating: "रेटिंग",
    action: "कार्य",
    connect: "जुड़ें",
    sent: "sent",
    notFoundProvider: [
      "उपयुक्त प्रदाता नहीं मिला?",
      "अपनी आवश्यकता अभी पोस्ट करें:",
    ],
    postRequirement: "पोस्ट आवश्यकता",
    requirementOf: "आवश्यकता:",
    requiredExperience: "आवश्यक अनुभव",
    preferredTime: "पसंदीदा समय:",
    select: "चयन कीजिए",
    submit: "जमा करें",
    cancel: "रद्द करें",
    morningOnly: "केवल सुबह",
    eveningOnly: "केवल शाम",
    morningEvening: "सुबह/शाम",
    allDay: "पूरे दिन",
    anytime: "किसी भी समय",
    requirementSavedSuccess: "आवश्यकता सफलतापूर्वक सहेजी गई|",
    requirementSavedError:
      "आवश्यकता सहेजने में विफल. कृपया बाद में पुन: प्रयास करें।",
    aboutTitle: "आपकी जानकारी:",
    name: "नाम",
    mobileNumber: "मोबाइल नंबर:",
    myActivitiesTitle: "आवश्यकताएं पोस्ट की गईं::",
    myActivitiesEmpty: "आपने अभी तक कोई आवश्यकता पोस्ट नहीं की है|",
    serviceRequired: "आवश्यक सेवा",
    dateOfPosting: "पोस्टिंग की तारीख",
    delete: "मिटाना",
    connectionRequestTitle: "आपको प्राप्त कनेक्शन अनुरोधों की सूची",
    requirementPostedOn: "पोस्ट करने की तारीख",
    provider: "प्रदाता का",
    wishToConnect: "कनेक्ट करना चाहते हैं?",
    accept: "स्वीकार",
    reject: "अस्वीकार",
    giveFeedback: "प्रतिक्रिया दें",
    connectionRequestSentTitle: "आपके द्वारा भेजे गए कनेक्शन अनुरोधों की सूची",
    customer: "ग्राहक",
    sentRequestSuccess: [
      "आपने अनुरोध को सफलतापूर्वक स्वीकार कर लिया है|",
      "प्रदाता का संपर्क विवरण जल्द ही आपके ई-मेल पर भेज दिया जाएगा।",
      "आपका संपर्क विवरण जल्द ही प्रदाता के साथ साझा किया जाएगा।",
      "आपकी विज़िट के लिए धन्यवाद।",
    ],
    feedbackSuccess: [
      "अपना समय देने के लिए धन्यवाद। आपकी प्रतिक्रिया हमारे लिए बहुमूल्य है।",
      "आपका दिन शुभ हो।",
    ],
    close: "बंद करें",
    feedback: "प्रतिक्रिया",
    feedbackQuestions: [
      "आपका अनुभव कैसा रहा?",
      "आप हमारे प्रदाता की सेवा का वर्णन कैसे करेंगे?",
      "आप और कुछ साझा करना चाहते हैं?",
    ],
    change: "बदलें",
    updateAddressTitle: "पता अपडेट करें",
    enterNewAddress: "नया पता दर्ज करें:",
    requirementsTitle:"ग्राहकों की आवश्यकताओं की सूची"
  };

  return (
    <AppContext.Provider
      value={{
        isHindi,
        setIsHindi,
        changeLanguage,
        dataEnglish,
        dataHindi,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
export default AppState;
