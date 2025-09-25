import React, { useEffect } from "react";

const PrivacyPolicy: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="flex flex-col text-pretty p-4 md:p-8 lg:p-15 gap-8 font-manrope h-full w-full overflow-y-auto ">
            <p className="text-black text-3xl text-center sm:text-start sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-manrope">
                Privacy Policy
            </p>
            <p className="text-black font-semibold text-lg/9 ">
                HeadsIn app is a commercial app by HeadsIn Connect LLP ("
                <b>HEADSIN</b>"). This page is used to inform visitors regarding
                our policies with the collection, use, and disclosure of
                Personal Information for anyone using the app and website of
                HEADSIN ("<b>HeadsIn Platform</b>"). By using HeadsIn Platform,
                you consent to the terms of our privacy policy ("
                <b>Privacy Policy</b>") in addition to our Terms of Service. We
                encourage you to read this Privacy Policy regarding the
                collection, use, and disclosure of your information from time to
                time to keep yourself updated with the changes & updated that we
                make to this Privacy Policy.
            </p>
            <p className=" text-2xl font-semibold">
                Personal Identification Information
            </p>
            <p className="text-black font-semibold text-lg/9 ">
                If you choose to use our Service, then you agree to the
                collection and use of information in relation to this policy.
                The Personal Identification Information that we collect is used
                for providing and improving the Service. We will not use or
                share your information with anyone except as described in this
                Privacy Policy.
            </p>
            <p className="text-black font-semibold text-lg/9 ">
                The personal information you provide on HeadsIn Platform when
                you fill out your profile is public, such as your name,
                location, gender, profile picture, education and professional
                info including where you are working. This is herein after
                called Public Profile. Your Public Profile will be published on
                HeadsIn.co/username. Your Public Profile can:
            </p>

            <ul className="list-decimal list-outside text-black font-semibold ps-5 md:ps-6 lg:ps-9 flex flex-col gap-3 text-lg/9">
                <li>Be associated with you on the internet</li>
                <li>
                    Show up when someone does a search on search engine We also
                    use your Public Profile, to help connect you with friends
                    and family which increases your and your friends' chances to
                    find suitable job opportunities.
                </li>
            </ul>
            <p className="text-black font-semibold text-lg/9 ">
                We may collect Personal Identification Information of users
                including the information that is available on the internet,
                such as from Truecaller, Facebook, LinkedIn, Twitter and Google,
                or publicly available information that we acquire from service
                providers. We collect this information to identify users for
                better communication, processing and personalization of the
                Services provided by Applozic.
            </p>

            <p className="text-2xl font-semibold">
                Non-personal Identification Information
            </p>
            <p className="text-black font-semibold text-lg/9 ">
                We may collect non-personal identification information about
                users whenever they interact with our site. Non-personal
                identification information may include the type of mobile phone
                and technical information about users, such as the operating
                system and the Internet service providers utilized including IP
                address and other similar information.
            </p>
            <p className=" text-2xl font-semibold">
                Usage and Technical Information
            </p>
            <p className="text-black font-semibold text-lg/9 ">
                We collect the information about how you interact with our
                Service. This information may include your IP address,
                geographical location, browser type, referral source, length of
                visit, pages viewed and items clicked.
            </p>

            <p className=" text-2xl font-semibold">Information Collection</p>
            <p className="text-black font-semibold text-lg/9 ">
                For a better experience, while using our Service, you are
                required to provide us with certain personally identifiable
                information for your Public Profile, including but not limited
                to:
            </p>

            <ul className="list-decimal list-outside text-black font-semibold ps-5 md:ps-6 lg:ps-9 flex flex-col gap-3 text-lg/9">
                <li>
                    <b>Identity information,</b> such as your first name, last
                    name, gender, username and/or similar as may be verified by
                    voter ID card, PAN or driving license;
                </li>
                <li>
                    {" "}
                    <b>Contact information,</b> such as your mobile number,
                    postal address, email address and telephone number;
                </li>
                <li>
                    {" "}
                    <b>Professional information</b> such as your education, work
                    experience, skills, salary, photo, city, area and other
                    relevant details. Professional information helps you to get
                    more from our Services, including helping employers find
                    you. Please do not post or add personal data to your resume
                    that you would not want to be publicly available.
                </li>
                <li>
                    {" "}
                    <b>Feedback and correspondence,</b> such as information you
                    provide when you respond to surveys, participate in market
                    research activities, report a problem with Service, receive
                    customer support or otherwise correspond with us;
                </li>
                <li>
                    {" "}
                    <b>Usage information,</b> such as information about how you
                    use the Service and interact with us;
                </li>
                <li>
                    {" "}
                    <b>Marketing information,</b> such as your preferences for
                    receiving marketing communications and details about how you
                    engage with them.
                </li>
            </ul>

            <p className="text-black font-semibold text-lg/9 ">
                HeadsIn Platform’s mission is to connect talent to job
                opportunities and employers to quality talent. We are committed
                to be transparent about the data we collect about you, how it is
                used and with whom it is shared.
            </p>
            <p className="text-black font-semibold text-lg/9 ">
                When you use the services of our customers and partners, such as
                employers or prospective employers and applicant tracking
                systems, we share your Public Profile (e.g., your job title and
                name of the company where you work) with prospective employers
                to enable you to get job interviews.
            </p>

            <div className="flex flex-col gap-3">
                <p className=" text-2xl font-semibold">
                    Information we collect
                </p>

                <ul className="list-decimal list-outside text-black font-semibold ps-5 md:ps-6 lg:ps-9 flex flex-col gap-3 text-lg/9">
                    <li className="text-[#3F1562] text-2xl font-semibold">
                        Contacts List.
                    </li>
                    <p>
                        When you sync your contacts with our Services, we import
                        and store the contacts list to our servers. You have the
                        option to deny us the access to your contacts list.
                    </p>
                    <p>
                        We also receive personal data (including contact
                        information) about you when others import or sync their
                        contacts with our Services.
                    </p>

                    <li className="text-[#3F1562] text-2xl font-semibold">
                        Location Information.
                    </li>
                    <p>
                        When you give location permission, we access information
                        that is derived from your GPS. We may use third-party
                        cookies and similar technologies to collect some of this
                        information.
                    </p>

                    <li className="text-[#3F1562] text-2xl font-semibold">
                        Storage.
                    </li>
                    <p>
                        When you opt-in for storage permission, we access your
                        device storage like gallery photos.
                    </p>

                    <li className="text-[#3F1562] text-2xl font-semibold">
                        Camera.
                    </li>
                    <p>
                        Granting camera permission allows us to access the photo
                        that you click to be displayed on your resume.
                    </p>

                    <li className="text-[#3F1562] text-2xl font-semibold">
                        Microphone.
                    </li>
                    <p>
                        Voice and audio information when you use audio features.
                    </p>
                </ul>
            </div>

            <div className="flex flex-col gap-3">
                <p className=" text-2xl font-semibold">How we use it</p>

                <ul className="list-decimal list-outside text-black font-semibold ps-5 md:ps-6 lg:ps-9 flex flex-col gap-3 text-lg/9">
                    <li className="text-[#3F1562] text-2xl font-semibold">
                        Contacts List.
                    </li>
                    <p>
                        We collect your contacts to help you keep growing your
                        network by suggesting connections for you and your
                        friends.
                    </p>

                    <li className="text-[#3F1562] text-2xl font-semibold">
                        Location Information.
                    </li>
                    <p>
                        To provide you with location-based services like finding
                        jobs near you.
                    </p>

                    <li className="text-[#3F1562] text-2xl font-semibold">
                        Storage.
                    </li>
                    <p>
                        To allow you to select your profile picture from your
                        existing photos in the gallery. A good resume photo
                        helps you stand out among other candidates.
                    </p>

                    <li className="text-[#3F1562] text-2xl font-semibold">
                        Camera.
                    </li>
                    <p>
                        To allow you to click your profile picture. A good
                        resume photo helps you stand out among other candidates.
                    </p>

                    <li className="text-[#3F1562] text-2xl font-semibold">
                        Microphone.
                    </li>
                    <p>To allow you to send audio messages within the app.</p>

                    <li className="text-[#3F1562] text-2xl font-semibold">
                        Call.
                    </li>
                    <p>For enabling the Call HR feature of the app.</p>
                    <p>
                        To effectively provide and introduce any new Services to
                        you, we collect and use certain information, including,
                        but not limited to, such as:
                    </p>

                    <ol className="list-disc list-outside text-black font-semibold ps-5 md:ps-6 lg:ps-9 flex flex-col gap-3 text-lg/9">
                        <li>
                            We may use your email id to send you updates on job
                            opportunities.
                        </li>
                        <li>We log your visits and use of our Services.</li>
                        <li>
                            We receive data from your devices and networks,
                            including location data.
                        </li>
                        <li>
                            We may further request and store additional
                            information.
                        </li>
                        <li>
                            To monitor usage or traffic patterns (including to
                            track users' movements around the Services) and
                            gather demographic information.
                        </li>
                        <li>
                            To communicate directly with you, including by
                            sending you information about new products and
                            services.
                        </li>
                        <li>
                            To deliver you a personalized experience. May come
                            in the form of messages, delivering tailor-made ads
                            based on your interest and browsing history.
                        </li>
                    </ol>
                </ul>
            </div>

            <p className="text-black font-semibold text-lg/9 ">
                To the extent permitted by the applicable law, we may record and
                monitor your communications with us to ensure compliance with
                our legal and regulatory obligations and our internal policies.
                This may include the recording of telephone conversations.
            </p>

            <p className=" text-2xl font-semibold">
                How we protect your information?
            </p>
            <p className="text-black font-semibold text-lg/9 ">
                We adopt appropriate data collection, storage and processing
                practices and security measures to protect against unauthorized
                access, alteration, disclosure or destruction of your personal
                information, username, password, transaction information and
                data stored on our app. The data is stored securely on our
                servers.
            </p>

            <p className=" text-2xl font-semibold">
                Sharing your personal information
            </p>
            <p className="text-black font-semibold text-lg/9 ">
                We do not sell, trade, or rent users personal identification
                information to any third party. We may share generic aggregated
                demographic information not linked to any personal
                identification information regarding visitors and users with our
                business partners, trusted affiliates and advertisers for the
                purposes outlined above.
            </p>
            <p className="text-black font-semibold text-lg/9 ">
                The app does use third-party services that may collect
                information used to identify you.
            </p>
            <p className="text-black font-semibold text-lg/9 ">
                We do not disclose, transfer or share your personal information
                with others except with:
            </p>
            <ul className="list-disc list-outside text-black font-semibold ps-5 md:ps-6 lg:ps-9 flex flex-col gap-3 text-lg/9">
                <li>
                    Our affiliates and group companies to the extent required
                    for our internal business and/or administrative purposes
                    and/or general corporate operations and for provision of
                    services aimed at helping you in your career enhancement;
                </li>
                <li>
                    Companies, in the event you have posted jobs on HeadsIn
                    Platform on behalf of such companies;
                </li>
                <li>
                    Candidates who have applied to the job posted by you on the
                    Platform, if we determine that the requirements of the job
                    post, match with the resume of the candidate. By registering
                    on the Platform and consenting to the terms of this Privacy
                    Policy, you agree that we may contact you or share your
                    contact details with the candidates for the purpose of the
                    Services;
                </li>
                <li>
                    Potential recruiters/ job posters if we determine that your
                    resume matches a particular job description/ vacancy
                    available with such recruiters. By registering on the
                    Platform and consenting to the terms of this Privacy Policy,
                    you agree that we may contact you or forward your resume to
                    potential recruiters;
                </li>
                <li>
                    Third parties including enforcement, regulatory and judicial
                    authorities, if we determine that disclosure of your
                    personal information is required to a) respond to court
                    orders, or legal process, or to establish or exercise our
                    legal rights or defend against legal claims; or b)
                    investigate, prevent, or take action regarding illegal
                    activities, suspected fraud, situations involving potential
                    threats to the physical safety of any person, violations of
                    our Terms of Service or as otherwise required by law;
                </li>
                <li>
                    In the event of a merger, acquisition, financing, or sale of
                    assets or any other situation involving the transfer of some
                    or all of our business assets we may disclose personal
                    information to those involved in the negotiation or
                    transfer.
                </li>
                <li>
                    Third party service providers and marketing partners that we
                    engage to a) provide services over the Platform on our
                    behalf; b) maintain the Platform and mailing lists; or c)
                    communicate with you on our behalf about offers relating to
                    its products and/or services. We will take reasonable steps
                    to ensure that these third-party service providers are
                    obligated to protect your personal information and are also
                    subject to appropriate confidentiality / non-disclosure
                    obligations.
                </li>
            </ul>
            <p className="text-black font-semibold text-lg/9 ">
                You, hereby agree and acknowledge that you will use the
                information shared with you only for the purpose of the
                Services. You shall not use such information for any personal or
                other business purposes. In the event you are found to be
                misusing the information shared with you, we shall, at our sole
                discretion, delete your account with immediate effect and you
                will be blocked from using/ accessing HeadsIn Platform in
                future.
            </p>

            <div className="flex flex-col gap-3">
                <p className=" text-2xl font-semibold">Log Data</p>
                <p className="text-black font-semibold text-lg/9 ">
                    Whenever you use our Service, including our sites, and
                    platform technology, such as when you view or click on
                    content (e.g., learning video) or perform a search, install
                    or update one of our mobile apps, post messages or apply for
                    jobs and in a case of an error in the app we collect data
                    and information (through third-party products) on your phone
                    called Log Data. This Log Data may include information such
                    as log-ins, cookies, your device Internet Protocol ("IP")
                    address, device name, operating system version, the
                    configuration of the app when utilizing our Service, the
                    time and date of your use of the Service, and other
                    statistics to identify you and log your use.
                </p>
            </div>

            <div className="flex flex-col gap-3">
                <p className=" text-2xl font-semibold">Cookies</p>
                <p className="text-black font-semibold text-lg/9 ">
                    Cookies are files with a small amount of data that are
                    commonly used as anonymous unique identifiers. These are
                    sent to your browser from the websites that you visit and
                    are stored on your device's internal memory.
                </p>
                <p className="text-black font-semibold text-lg/9 ">
                    This Service does not use these "cookies" explicitly.
                    However, the app may use third party code and libraries that
                    use "cookies" to collect information and improve their
                    services. You have the option to either accept or refuse
                    these cookies and know when a cookie is being sent to your
                    device. If you choose to refuse our cookies, you may not be
                    able to use some portions of this Service.
                </p>
            </div>

            <div className="flex flex-col gap-3">
                <p className=" text-2xl font-semibold">Service Providers</p>
                <p className="text-black font-semibold text-lg/9 ">
                    We may employ third-party companies and individuals due to
                    the following reasons:
                </p>
                <p className="text-black font-semibold text-lg/9 ">
                    To facilitate our Service; To provide the Service on our
                    behalf; To perform Service-related services; or To assist us
                    in analysing how our Service is used. We want to inform
                    users of this Service that these third parties have access
                    to your Personal Information. The reason is to perform the
                    tasks assigned to them on our behalf. However, they are
                    obligated not to disclose or use the information for any
                    other purpose.
                </p>
            </div>

            <div className="flex flex-col gap-3">
                <p className=" text-2xl font-semibold">One-to-one messages</p>
                <p className="text-black font-semibold text-lg/9 ">
                    HEADSIN has access to the one-to-one messages of users of
                    the app and we review these messages periodically for
                    moderation of trust and safety related concerns. However,
                    HEADSIN never shares this data with any third-party.
                </p>
            </div>

            <div className="flex flex-col gap-3">
                <p className=" text-2xl font-semibold">Security</p>
                <p className="text-black font-semibold text-lg/9 ">
                    We value your trust in providing us your Personal
                    Information, thus we are striving to use commercially
                    acceptable means of protecting it. But remember that no
                    method of transmission over the internet, or method of
                    electronic storage is 100% secure and reliable, and we
                    cannot guarantee its absolute security.
                </p>
            </div>

            <div className="flex flex-col gap-3">
                <p className=" text-2xl font-semibold">Links to Other Sites</p>
                <p className="text-black font-semibold text-lg/9 ">
                    This Service may contain links to other sites. If you click
                    on a third-party link, you will be directed to that site.
                    Note that these external sites are not operated by us.
                    Therefore, we strongly advise you to review the Privacy
                    Policy of these websites. We have no control over and assume
                    no responsibility for the content, privacy policies, or
                    practices of any third-party sites or services.
                </p>
            </div>

            <div className="flex flex-col gap-3">
                <p className=" text-2xl font-semibold">Children's Privacy</p>
                <p className="text-black font-semibold text-lg/9 ">
                    These Services do not address anyone under the age of 13. We
                    do not knowingly collect personally identifiable information
                    from children under 13. In the case we discover that a child
                    under 13 has provided us with personal information, we
                    immediately delete this from our servers. If you are a
                    parent or guardian and you are aware that your child has
                    provided us with personal information, please contact us so
                    that we will be able to do necessary actions.
                </p>
            </div>

            <div className="flex flex-col gap-3">
                <p className=" text-2xl font-semibold">
                    No Impersonation or False Information to be Provided
                </p>
                <p className="text-black font-semibold text-lg/9 ">
                    You have to use your actual name on the Platform, you are
                    required to input your correct phone number to use our
                    Services. You will be getting a job based on your HEADSIN
                    account. You will not falsely represent yourself as another
                    person or representative of another person to use our
                    Services. You will not lie about your details, for any
                    reason.
                </p>
            </div>

            <div className="flex flex-col gap-3">
                <p className=" text-2xl font-semibold">Trust and Safety</p>
                <p className="text-black font-semibold text-lg/9 ">
                    HEADSIN takes the trust and safety all its users seriously.
                    We do not allow content that promotes abuse, fraud,
                    MLM/network marketing, job openings that charge fees,
                    suicide, self-harm, or is intended to shock or disgust
                    users. Strict action is taken against such content and with
                    people posting such messages/content in the group.
                </p>
                <p className="text-black font-semibold text-lg/9 ">
                    To ensure the best possible experience for all the users of
                    the app, we have established some basic guidelines called
                    the Community Guidelines. The Community Guidelines gets
                    updated periodically. You will be notified when this
                    happens.
                </p>
            </div>

            <div className="flex flex-col gap-3">
                <p className=" text-2xl font-semibold">Disclaimer</p>
                <p className="text-black font-semibold text-lg/9 ">
                    HeadsIn does not hold any responsibility for any incident,
                    fraud, cheat or crime that may happen to any users. We
                    advise you to check and verify information of other users
                    before proceeding with any transactions or interaction among
                    users. Also, do not share your private information on group,
                    to prevent the use of such information for any un-safe
                    purposes.
                </p>
            </div>

            <div className="flex flex-col gap-3">
                <p className=" text-2xl font-semibold">
                    Changes to This Privacy Policy
                </p>
                <p className="text-black font-semibold text-lg/9 ">
                    We may update our Privacy Policy from time to time. Thus,
                    you are advised to review this page periodically for any
                    changes. We will notify you of any changes by posting the
                    new Privacy Policy on this page. These changes are effective
                    immediately after they are posted on this page.
                </p>
            </div>

            <div className="flex flex-col gap-3">
                <p className=" text-2xl font-semibold">Contact Us</p>
                <p className="text-black font-semibold text-lg/9 ">
                    If you have any questions or suggestions about our Privacy
                    Policy, do not hesitate to contact us at:
                </p>
                <p className="text-black font-semibold text-lg/9 ">
                    HeadsIn Connect LLP 2nd + 3rd Floor, Patel Ind. Society,
                    Opp. Anath Ashram, Katargam, <br /> Surat-395004 Gujarat,
                    India Email: contact@headsin.co
                </p>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
