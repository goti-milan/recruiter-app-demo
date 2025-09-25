import { PRIVACY_POLICY } from "@/routes";
import React, { useEffect } from "react";

const CodeofConduct: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="flex flex-col text-pretty p-4 md:p-8 lg:p-15 gap-8 font-manrope h-full w-full overflow-y-auto ">
            <p className="text-black text-3xl text-center sm:text-start sm:text-5xl md:text-6xl lg:text-7xl font-extrabold">
                Code Of <span className="text-[#DF6789]">Conduct</span>
            </p>
            <p className="text-black font-semibold text-lg/9 ">
                This Code of Conduct aims to ensure that the HeadsIn Platform
                and HeadsIn Services are free of inappropriate and unwanted
                content or behavior. This Code of Conduct, which we continue to
                develop, provides guidance and rules for the use of the HeadsIn
                Platform and HeadsIn Services. We request you to bring to our
                attention anything that you believe may violate our policies.
                You are requested to report such actions on contact@headsin.co
            </p>
            <p className=" text-black font-semibold text-lg/9 ">
                These reports, along with our{" "}
                <span className="font-extrabold">automated defenses</span>, help
                us identify and prevent abuse and misbehavior. Please use the
                reporting tools responsibly and only for their intended purposes
                and not for unnecessarily harassing other users. A violation of
                this Code of Conduct may result in us taking action, including
                but not limited to suspending your access to the HeadsIn
                Platform and HeadsIn Services and where applicable cases
                reporting illegal activities to the concerned authorities.
                Depending on the severity of the violation and a member's
                behavior or account history, we may block your account
                permanently.
            </p>

            <div className="flex flex-col gap-4">
                <h1 className="text-[#DF6789] text-xl font-semibold">
                    You agree that you will:
                </h1>
                <ul className="list-decimal list-outside text-black font-semibold ps-5 md:ps-6 lg:ps-9 flex flex-col gap-3 text-lg/9">
                    <li>
                        Comply with all applicable laws, including, without
                        limitation, privacy laws, intellectual property laws,
                        anti-spam laws, export control laws, tax laws, and
                        regulatory requirements.
                    </li>
                    <li>
                        Provide accurate information to us and keep it updated.
                    </li>
                    <li>Use the Services in a professional manner.</li>
                    <li>
                        Ensure that all information you provide is accurate.
                    </li>
                </ul>
            </div>

            <div className="flex flex-col gap-4">
                <h1 className="text-[#DF6789] text-xl font-semibold">
                    You agree that you will not:
                </h1>
                <ul className="list-decimal list-outside text-black font-semibold ps-5 md:ps-6 lg:ps-9 flex flex-col gap-3 text-lg/9">
                    <li>
                        Create a fake profile on HEADSIN, misrepresent your
                        identity, impersonate anyone, create a Member profile
                        for anyone other than yourself (a real person), or use
                        or attempt to use another's account
                    </li>
                    <li>
                        Use any information which may be considered misleading
                        or deceptive
                    </li>
                    <li>
                        Communicate with any person using the HeadsIn Platform
                        or HeadsIn Services in a manner which may be considered
                        offensive or inappropriate
                    </li>
                    <li>
                        Directly or indirectly scrape the Services or otherwise
                        copy profiles and other data from the Services
                    </li>
                    <li>
                        Try to circumvent any access controls or use limits of
                        the Service (such as caps on keyword searches or profile
                        views)
                    </li>
                    <li>
                        Copy, use, disclose or distribute any information
                        obtained from the Services, whether directly or through
                        third parties (such as search engines), without the
                        consent of HEADSIN
                    </li>
                    <li>
                        Breach your confidentiality obligations by disclosing
                        information you do not have the consent to disclose
                    </li>
                    <li>Violate anyone's intellectual property rights</li>
                    <li>
                        Violate the intellectual property or other rights of
                        HEADSIN
                    </li>
                    <li>
                        Post anything that contains software viruses, worms, or
                        any other harmful code
                    </li>
                    <li>
                        Reverse engineer, decompile, disassemble, decipher or
                        otherwise attempt to derive the source code for the
                        Services or any related technology that is not open
                        source
                    </li>
                    <li>
                        Imply or state that you are affiliated with or endorsed
                        by HEADSIN without our express consent (e.g.,
                        representing yourself as an accredited HEADSIN trainer)
                    </li>
                    <li>
                        Monetize in any manner Services or related data or
                        access to the same, without HEADSIN's consent
                    </li>
                    <li>
                        Deep-link to our Services for any purpose other than to
                        promote your profile or a Group on our Services, without
                        HEADSIN's consent
                    </li>
                    <li>
                        Use bots or other automated methods to access the
                        Services, add or download contacts, send or redirect
                        messages
                    </li>
                    <li>
                        Monitor the Services' availability, performance or
                        functionality for any competitive purpose
                    </li>
                    <li>
                        Engage in "framing," "mirroring," or otherwise
                        simulating the appearance or function of the Services
                    </li>
                    <li>
                        Overlay or otherwise modify the Services or their
                        appearance (such as by inserting elements into the
                        Services or removing, covering, or obscuring an
                        advertisement included on the Services)
                    </li>
                    <li>
                        Interfere with the operation of, or place an
                        unreasonable load on, the Services (e.g., spam, denial
                        of service attack, viruses, gaming algorithms)
                    </li>
                    <li>
                        Violate the Professional Community Policies or any
                        additional terms concerning a specific Service that are
                        provided when you sign up for or start using such
                        Service, where applicable
                    </li>
                    <li>
                        Act as a consultant or middleman or in any similar
                        capacity or charge any fee for providing recruitment or
                        related services
                    </li>
                    <li>
                        Participate in any harassment or send other unwelcome
                        communications to any person (e.g., romantic advances,
                        sexually explicit content, junk mail, spam, chain
                        letters, phishing schemes) or fraud
                    </li>
                    <li>Share graphic, obscene, or pornographic content</li>
                    <li>
                        Discriminate on the basis of age, race, caste, sex,
                        gender, political affiliations, geography, or indulge in
                        any practices that may be considered to be
                        discriminatory in any manner or form
                    </li>
                    <li>
                        Propagate or endorse or advocate hate speech, hate
                        groups, terrorists, or those who engage in violent
                        crimes
                    </li>
                </ul>
            </div>

            <p className="text-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold font-manrope">
                Code Of <span className="text-[#3F1562]">Conduct</span> -
                Employer
            </p>

            <div className="flex flex-col gap-4">
                <h1 className="text-2xl md:2xl lg:text-3xl font-bold mt-5">
                    User Agreement with Employers
                </h1>
                <p className="text-xl/9 font-semibold">
                    This is a user agreement between HeadsIn Connect LLP
                    (‘Headsin’) and the Individual (hereinafter referred to as
                    ‘employer’) posting a job on the Headsin employer platform -
                    (employer.headsin.co). Our services are designed to promote
                    economic opportunity for the users by helping them find the
                    existing job vacancies.
                </p>
            </div>

            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-semibold">1. Introducation</h1>
                <p className="text-[#3F1562] text-2xl font-semibold mt-5">
                    1.1 Contract
                </p>

                <ul className="list-disc list-outside text-black font-semibold ps-5 md:ps-6 lg:ps-9 flex flex-col gap-3 text-lg/9">
                    <li>
                        You may use our Services only if you agree to the terms
                        contained hereunder. Your use of our Services is also
                        subject to{" "}
                        <a
                            href={PRIVACY_POLICY}
                            target="_blank"
                            className="underline text-[#3F1562]"
                        >
                            Privacy Policy
                        </a>
                        , which covers how we collect, use, share, and store
                        your personal information. You agree that by clicking
                        "Post a Job" or similar buttons indicating your
                        willingness to use the Headsin platform, registering,
                        accessing or using our services (described below),{" "}
                        <span className="font-extrabold">
                            you are agreeing to enter into a legally binding
                            contract
                        </span>{" "}
                        with HEADSIN (even if you are using our Services on
                        behalf of a company). If you do span not agree to this
                        contract ("Contract" or "User Agreement"), do{" "}
                        <span className="font-extrabold">not</span> click "Post
                        a Job" (or similar) and do not access or otherwise use
                        any of our Services. If you wish to terminate this
                        contract, at any time you can do so by closing your
                        account and no longer accessing or using our Services.
                    </li>
                </ul>
                <p className="text-2xl font-bold">Services</p>
                <ul className="list-disc list-outside text-black font-semibold ps-5 md:ps-6 lg:ps-9 flex flex-col gap-3 text-lg/9">
                    <li>
                        This Contract applies to HEADSIN.co, HEADSIN-branded
                        apps and other HEADSIN-related sites, apps,
                        communications and other services that state that they
                        are offered under this Contract ("Services"), including
                        the offsite collection of data for those Services, such
                        as our ads and the "Apply with HEADSIN" and "Share with
                        HEADSIN" plugins. Registered users of our Services are
                        "Members" and unregistered users are "Visitors".
                    </li>
                </ul>
                <p className="text-2xl font-bold">HEADSIN</p>
                <ul className="list-disc list-outside text-black font-semibold ps-5 md:ps-6 lg:ps-9 flex flex-col gap-3 text-lg/9">
                    <li>
                        You are entering into this Contract with HEADSIN (also
                        referred to as "we" and "us"). We use the term
                        "Designated Country" to refer to India. If you reside in
                        the "Designated Country", you are entering into this
                        Contract with HeadsIn Connect LLP ("HEADSIN India") and
                        HEADSIN India will be the controller of your personal
                        data provided to, or collected by or for, or processed
                        in connection with our Services. This Contract applies
                        to Members and Visitors. As a Visitor or Member of our
                        Services, the collection, use and sharing of your
                        personal data is subject to this{" "}
                        <a
                            href={PRIVACY_POLICY}
                            target="_blank"
                            className="underline text-[#3F1562]"
                        >
                            Privacy Policy
                        </a>{" "}
                        (which includes other documents referenced in this
                        Privacy Policy) and updates.
                    </li>
                </ul>
                <p className="text-[#3F1562] text-2xl font-semibold">
                    1.2 Members and Visitors
                </p>
                <ul className="list-disc list-outside text-black font-semibold ps-5 md:ps-6 lg:ps-9 flex flex-col gap-3 text-lg/9">
                    <li>
                        When you register and join the HEADSIN Service or become
                        a registered user, you become a Member. If you have
                        chosen not to register for our Services, you may access
                        certain features as a "Visitor."
                    </li>
                </ul>
                <p className="text-[#3F1562] text-2xl font-semibold">
                    1.3 Modification
                </p>
                <ul className="list-disc list-outside text-black font-semibold ps-5 md:ps-6 lg:ps-9 flex flex-col gap-3 text-lg/9">
                    <li>
                        We may modify this Contract, and our Privacy Policy from
                        time to time. If we make material changes to it, we will
                        provide you notice through our Services, or by other
                        means, to provide you the opportunity to review the
                        changes before they become effective. Your continued use
                        of our Services after we publish or send a notice about
                        our changes to these terms means that you are consenting
                        to the updated terms as of their effective date.
                    </li>
                </ul>
            </div>

            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-semibold mb-5">2. Obligations</h1>
                <p className="text-[#3F1562] text-2xl font-semibold">
                    2.1 Service Eligibility
                </p>
                <ul className="list-disc list-outside text-black font-semibold ps-5 md:ps-6 lg:ps-9 flex flex-col gap-3 text-lg/9">
                    <li>
                        You're eligible to enter into this Contract and you are
                        at least our "Minimum Age." The Services are not for use
                        by anyone under the age of 18. To use the Services, you
                        agree that: (1) you must be the{" "}
                        <span className="italic">"Minimum Age"</span> (described
                        below) or older; (2) your account must be in your real
                        name and your own phone number; and (3) you are not
                        already restricted by HEADSIN from using the Services.
                        Creating an account with false information is a
                        violation of our terms, including accounts registered on
                        behalf of others or persons under the age of 18.
                        "Minimum Age" means 18 years old. However, if law
                        requires that you must be older in order for HEADSIN to
                        lawfully provide the Services to you without parental
                        consent (including using of your personal data) then the
                        Minimum Age is such older age. You also confirm you are
                        an authorised representative of the ‘Company’ on behalf
                        of whom you are hiring and are not an imposter.
                    </li>
                </ul>
                <p className="text-[#3F1562] text-2xl font-semibold">
                    2.2 Your Account
                </p>
                <ul className="list-disc list-outside text-black font-semibold ps-5 md:ps-6 lg:ps-9 flex flex-col gap-3 text-lg/9">
                    <li>
                        Your account should be kept confidential at all times
                        and should be compromised in any manner. You are
                        responsible for anything that happens through your
                        account unless you close it or report misuse. As between
                        you and others (including your employer), your account
                        belongs to you. However, if the Services were purchased
                        by another party for you to use (e.g. Recruiter seat
                        bought by your employer), the party paying for such
                        Service has the right to control access to and get
                        reports on your use of such paid Service; however, they
                        do not have rights to your personal account.
                    </li>
                </ul>

                <p className="text-[#3F1562] text-2xl font-semibold">
                    2.3 Notices and Messages
                </p>
                <ul className="list-disc list-outside text-black font-semibold ps-5 md:ps-6 lg:ps-9 flex flex-col gap-3 text-lg/9">
                    <li>
                        You're okay with us providing notices and messages to
                        you through our websites, apps, and contact information.
                        If your contact information is out of date, you may miss
                        out on important notices. You agree that we will provide
                        notices and messages to you in the following ways: (1)
                        within the Service, or (2) sent to the contact
                        information you provided us (e.g., email, mobile number,
                        physical address). You agree to keep your contact
                        information up to date.
                    </li>
                </ul>

                <p className="text-[#3F1562] text-2xl font-semibold">
                    2.4 Sharing
                </p>
                <ul className="list-disc list-outside text-black font-semibold ps-5 md:ps-6 lg:ps-9 flex flex-col gap-3 text-lg/9">
                    <li>
                        When you share information on our Services, others can
                        see, copy and use that information. Our Services allow
                        messaging and sharing of information in many ways, such
                        as your profile, articles, group posts, links to news
                        articles, job postings, messages and one - one messages.
                        Information and content that you share or post may be
                        seen by other Members, Visitors or others (including off
                        of the Services). Where we have made settings available,
                        we will honor the choices you make about who can see
                        content or information (e.g., message content to your
                        addressees, sharing content only to HEADSIN connections,
                        restricting your profile visibility from search engines,
                        or opting not to notify others of your HEADSIN profile
                        update). For job searching activities, we default to not
                        notifying your connections network or the public. So, if
                        you apply for a job through our Service or opt to signal
                        that you are interested in a job, our default is to
                        share it only with the job poster. We are not obligated
                        to publish any information or content on our Service and
                        can remove it with or without notice.
                    </li>
                </ul>
            </div>

            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-semibold mb-5">
                    3. Rights and Limits
                </h1>
                <p className="text-[#3F1562] text-2xl font-semibold">
                    3.1. Your License to HEADSIN
                </p>
                <ul className="list-disc list-outside text-black font-semibold ps-5 md:ps-6 lg:ps-9 flex flex-col gap-3 text-lg/9">
                    <li>
                        You own all of the content, feedback and personal
                        information you provide to us, but you also grant us a
                        non-exclusive license to it. We'll honor the choices you
                        make about who gets to see your information and content,
                        including how it can be used for ads. As between you and
                        HEADSIN, you own the content and information that you
                        submit or post to the Services, and you are only
                        granting HEADSIN and our affiliates the following
                        non-exclusive license: A worldwide, transferable and
                        sublicensable right to use, copy, modify, distribute,
                        publish and process, information and content that you
                        provide through our Services and the services of others,
                        without any further consent, notice and/or compensation
                        to you or others. These rights are limited in the
                        following ways:
                    </li>
                </ul>

                <ol className="list-decimal list-outside text-black font-semibold  flex flex-col gap-3 text-lg/9 ps-9">
                    <li>
                        You can end this license for specific content by
                        deleting such content from the Services, or generally by
                        closing your account, except (a) to the extent you
                        shared it with others as part of the Service and they
                        copied, re-shared it or stored it and (b) for the
                        reasonable time it takes to remove from backup and other
                        systems.
                    </li>
                    <li>
                        We will not include your content (excluding content
                        shared in groups) in advertisements for the products and
                        services of third parties to others without your
                        separate consent (including sponsored content). However,
                        we have the right, without payment to you or others, to
                        serve ads near your content and information, and your
                        social actions may be visible and included with ads, as
                        noted in the Privacy Policy. If you use a Service
                        feature, we may mention that with your name or photo to
                        promote that feature within our Services, subject to
                        your settings.
                    </li>
                    <li>
                        We will get your consent if we want to give others the
                        right to publish your content beyond the Services.
                        However, if you choose to share your post as "public",
                        we will enable a feature that allows other Members to
                        embed that public post onto third-party services, and we
                        enable search engines to make that public content
                        findable though their services.
                    </li>
                    <li>
                        While we may edit and make format changes to your
                        content (such as translating or transcribing it,
                        modifying the size, layout or file type or removing
                        metadata), we will not modify the meaning of your
                        expression.
                    </li>
                    <li>
                        Because you own your content and information and we only
                        have non-exclusive rights to it, you may choose to make
                        it available to others, including under the terms of a{" "}
                        <u className="text-[#3F1562] ">
                            Creative Commons license.
                        </u>
                    </li>
                </ol>

                <ul className="list-disc list-outside text-black font-semibold ps-5 md:ps-6 lg:ps-9 flex flex-col gap-3 text-lg/9">
                    <li>
                        You and HEADSIN agree that if content includes personal
                        data, it is subject to our Privacy Policy. You and
                        HEADSIN agree that we may access, store, process and use
                        any information and personal data that you provide in
                        accordance with, the terms of the{" "}
                        <a
                            href={PRIVACY_POLICY}
                            target="_blank"
                            className="underline text-[#3F1562] "
                        >
                            Privacy Policy{" "}
                        </a>{" "}
                        and your choices (including settings). By submitting
                        suggestions or other feedback regarding our Services to
                        HEADSIN, you agree that HEADSIN can use and share (but
                        does not have to) such feedback for any purpose without
                        compensation to you. You promise to only provide
                        information and content that you have the right to
                        share, and that your HEADSIN profile will be truthful.
                        You agree to only provide content or information that
                        does not violate the law nor anyone's rights (including
                        intellectual property rights). You also agree that your
                        profile information will be truthful. HEADSIN may be
                        required by law to remove certain information or content
                        in certain countries.
                    </li>
                </ul>

                <p className="text-[#3F1562] text-2xl font-semibold">
                    3.2 Service Availability
                </p>
                <ul className="list-disc list-outside text-black font-semibold ps-5 md:ps-6 lg:ps-9 flex flex-col gap-3 text-lg/9">
                    <li>
                        We may change or end any Service or modify our prices
                        prospectively. We may change, suspend or discontinue any
                        of our Services. We may also modify our prices effective
                        prospectively upon reasonable notice to the extent
                        allowed under the law. We don't promise to store or keep
                        showing any information and content that you've posted.
                        HEADSIN is not a storage service. You agree that we have
                        no obligation to store, maintain or provide you a copy
                        of any content or information that you or others
                        provide, except to the extent required by applicable law
                        and as noted in our Privacy Policy.
                    </li>
                </ul>

                <p className="text-[#3F1562] text-2xl font-semibold">
                    3.3 Other Content, Sites and Apps
                </p>
                <ul className="list-disc list-outside text-black font-semibold ps-5 md:ps-6 lg:ps-9 flex flex-col gap-3 text-lg/9">
                    <li>
                        Your use of others' content and information posted on
                        our Services, is at your own risk. Others may offer
                        their own products and services through our Services,
                        and we aren't responsible for those third-party
                        activities. In order to engage proactively with all the
                        users, we have put in place a system where at all times,
                        either bots or customer service personnel
                        ("Facilitator") are available to address the concerns of
                        the users. By using the Services, you may encounter
                        content or information that might be inaccurate,
                        incomplete, delayed, misleading, illegal, offensive or
                        otherwise harmful. HEADSIN generally does not review
                        content provided by our Members or others. You agree
                        that we are not responsible for others' (including other
                        Members') content or information. We cannot always
                        prevent this misuse of our Services, and you agree that
                        we are not responsible for any such misuse. You also
                        acknowledge the risk that you or your organization may
                        be mistakenly associated with content about others when
                        we let connections and followers know you or your
                        organization were mentioned in the news. HEADSIN may
                        help connect Members offering their services (career
                        coaching, accounting, etc.) with Members seeking
                        services. HEADSIN does not perform nor employs
                        individuals to perform these services. You must be at
                        least 18 years of age to offer, perform or procure these
                        services. You acknowledge that HEADSIN does not
                        supervise, direct, control or monitor Members in the
                        performance of these services and agree that (1) HEADSIN
                        is not responsible for the offering, performance or
                        procurement of these services, (2) HEADSIN does not
                        endorse any particular Member's offered services, and
                        (3) nothing shall create an employment, agency, or joint
                        venture relationship between HEADSIN and any Member
                        offering services. If you are a Member offering
                        services, you represent and warrant that you have all
                        the required licenses and will provide services
                        consistent with our Professional Community Guidelines.
                        Similarly, HEADSIN may help you register for and/or
                        attend events organized by Members and connect with
                        other Members who are attendees at such events. You
                        agree that (1) HEADSIN is not responsible for the
                        conduct of any of the Members or other attendees at such
                        events, (2) HEADSIN does not endorse any particular
                        event listed on our Services, (3) HEADSIN does not
                        review and/or vet any of these events, and (4) that you
                        will adhere to these terms and conditions that apply to
                        such events.
                    </li>
                </ul>

                <p className="text-[#3F1562] text-2xl font-semibold">
                    3.4 Limits
                </p>
                <ul className="list-disc list-outside text-black font-semibold ps-5 md:ps-6 lg:ps-9 flex flex-col gap-3 text-lg/9">
                    <li>
                        We may restrict, suspend, or terminate your account if
                        you breach this Contract or the law or are misusing the
                        Services (e.g., violating any of the Dos and Don'ts or
                        Professional Community Guidelines).
                    </li>
                </ul>

                <p className="text-[#3F1562] text-2xl font-semibold">
                    3.5 Intellectual Property Rights
                </p>
                <ul className="list-disc list-outside text-black font-semibold ps-5 md:ps-6 lg:ps-9 flex flex-col gap-3 text-lg/9">
                    <li>
                        We're providing you notice about our intellectual
                        property rights. HEADSIN reserves all of its
                        intellectual property rights in the Services. Trademarks
                        and logos used in connection with the Services are the
                        trademarks of their respective owners. HEADSIN, and "in"
                        logos and other HEADSIN trademarks, service marks,
                        graphics and logos used for our Services are trademarks
                        or registered trademarks of HEADSIN.
                    </li>
                </ul>

                <p className="text-[#3F1562] text-2xl font-semibold">
                    3.6 Automated Processing
                </p>
                <ul className="list-disc list-outside text-black font-semibold ps-5 md:ps-6 lg:ps-9 flex flex-col gap-3 text-lg/9">
                    <li>
                        We use data and information about you to make relevant
                        suggestions to you and others. We use the information
                        and data that you provide and that we have about Members
                        to make recommendations for connections, content and
                        features that may be useful to you. For example, we use
                        data and information about you to recommend jobs to you
                        and you to recruiters. Keeping your profile accurate and
                        up to date helps us to make these recommendations more
                        accurate and relevant.
                    </li>
                </ul>

                <p className="text-[#3F1562] text-2xl font-semibold">
                    3.7 Contacting You
                </p>
                <ul className="list-disc list-outside text-black font-semibold ps-5 md:ps-6 lg:ps-9 flex flex-col gap-3 text-lg/9">
                    <li>
                        By posting your job with Headsin, you authorise us to
                        contact you as and when we feel the need on the phone
                        number(s) and email provided by you. These modes of
                        communication can be through a call, SMS, WhatsApp or
                        any other third party service.
                    </li>
                </ul>

                <p className="text-[#3F1562] text-2xl font-semibold">
                    3.8 Daily WhatsApp for Business Notifications
                </p>
                <ul className="list-disc list-outside text-black font-semibold ps-5 md:ps-6 lg:ps-9 flex flex-col gap-3 text-lg/9">
                    <li>
                        We may contact you to share notifications, updates and
                        instructions regarding your job posting through our
                        WhatsApp for Business account. These messages will
                        directly delivered to your WhatsApp registered number.
                        You give us explicit permission to contact you on your
                        WhatsApp-registered number as per our discretion.
                    </li>
                </ul>
            </div>

            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-semibold mb-5">
                    4. Disclaimer and Limit of Liability
                </h1>
                <p className="text-[#3F1562] text-2xl font-semibold">
                    4.1 No Warranty
                </p>
                <ul className="list-disc list-outside text-black font-semibold ps-5 md:ps-6 lg:ps-9 flex flex-col gap-3 text-lg/9">
                    <li>
                        This is our disclaimer of legal liability for the
                        quality, safety, or reliability of our Services. HEADSIN
                        AND ITS AFFILIATES MAKE NO REPRESENTATION OR WARRANTY
                        ABOUT THE SERVICES, INCLUDING ANY REPRESENTATION THAT
                        THE SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE, AND
                        PROVIDE THE SERVICES (INCLUDING CONTENT AND INFORMATION)
                        ON AN "AS IS" AND "AS AVAILABLE" BASIS. TO THE FULLEST
                        EXTENT PERMITTED UNDER APPLICABLE LAW, HEADSIN AND ITS
                        AFFILIATES DISCLAIM ANY IMPLIED OR STATUTORY WARRANTY,
                        INCLUDING ANY IMPLIED WARRANTY OF TITLE, ACCURACY OF
                        DATA, NON-INFRINGEMENT, MERCHANTABILITY OR FITNESS FOR A
                        PARTICULAR PURPOSE. THE USER FEEDS INFORMATION/DATA INTO
                        THE NETWORK AND AS SUCH HEADSIN TIME HAS TO CONDUCTED
                        ANY SEARCH TO CHECK WHETHER THIS CONTAINS ANY FALSE,
                        DISTORTED, MANIPULATED, FRAUDULENT OR MISLEADING FACTS.
                    </li>
                </ul>

                <p className="text-[#3F1562] text-2xl font-semibold">
                    4.2 Exclusion of Liability
                </p>
                <ul className="list-disc list-outside text-black font-semibold ps-5 md:ps-6 lg:ps-9 flex flex-col gap-3 text-lg/9">
                    <li>
                        These are the limits of legal liability we may have to
                        you. TO THE FULLEST EXTENT PERMITTED BY LAW (AND UNLESS
                        HEADSIN HAS ENTERED INTO A SEPARATE WRITTEN AGREEMENT
                        THAT OVERRIDES THIS CONTRACT), HEADSIN, INCLUDING ITS
                        AFFILIATES, WILL NOT BE LIABLE IN CONNECTION WITH THIS
                        CONTRACT FOR LOST PROFITS OR LOST BUSINESS
                        OPPORTUNITIES, REPUTATION (E.G., OFFENSIVE OR DEFAMATORY
                        STATEMENTS), LOSS OF DATA (E.G., DOWN TIME OR LOSS, USE
                        OF, OR CHANGES TO, YOUR INFORMATION OR CONTENT) OR ANY
                        INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL OR PUNITIVE
                        DAMAGES. HEADSIN AND ITS AFFILIATES WILL NOT BE LIABLE
                        TO YOU IN CONNECTION WITH THIS CONTRACT FOR ANY AMOUNT
                        THAT EXCEEDS (A) THE TOTAL FEES PAID OR PAYABLE BY YOU
                        TO HEADSIN FOR THE SERVICES DURING THE TERM OF THIS
                        CONTRACT, IF ANY, OR (B) US $100.
                    </li>
                </ul>

                <p className="text-[#3F1562] text-2xl font-semibold">
                    4.3 Basis of the Bargain; Exclusions
                </p>
                <ul className="list-disc list-outside text-black font-semibold ps-5 md:ps-6 lg:ps-9 flex flex-col gap-3 text-lg/9">
                    <li>
                        The limitations of liability in this Section 4 are part
                        of the basis of the bargain between you and HEADSIN and
                        shall apply to all claims of liability (e.g., warranty,
                        tort, negligence, contract and law) even if HEADSIN or
                        its affiliates has been told of the possibility of any
                        such damage, and even if these remedies fail their
                        essential purpose. These limitations of liability do not
                        apply to liability for death or personal injury or for
                        fraud, gross negligence or intentional misconduct, or in
                        cases of negligence where a material obligation has been
                        breached, a material obligation being such which forms a
                        prerequisite to our delivery of services and on which
                        you may reasonably rely, but only to the extent that the
                        damages were directly caused by the breach and were
                        foreseeable upon conclusion of this Contract and to the
                        extent that they are typical in the context of this
                        Contract.
                    </li>
                </ul>
            </div>

            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-semibold mb-5">5. Termination</h1>
                <p className="text-black font-semibold text-lg/9 ">
                    We can each end this Contract, but some rights and
                    obligations survive. Both you and HEADSIN may terminate this
                    Contract at any time with notice to the other. On
                    termination, you lose the right to access or use the
                    Services. The following shall survive termination:
                </p>

                <ul className="list-disc list-outside text-black font-semibold ps-5 md:ps-6 lg:ps-9 flex flex-col gap-3 text-lg/9">
                    <li>Our rights to use and disclose your feedback;</li>
                    <li>
                        Members and/or Visitors' rights to further re-share
                        content and information you shared through the Services;
                    </li>
                    <li>Sections 4, 6, 7, and 8.2 of this Contract;</li>
                    <li>
                        Any amounts owed by either party prior to termination
                        remain owed after termination.
                    </li>
                </ul>
                <p className="text-black font-semibold text-lg/9 ">
                    This Agreement shall be governed by and construed in
                    accordance with the laws of India, excluding conflict of
                    laws principles. Any disputes arising from or in connection
                    with this Agreement or the Services shall be subject to the
                    exclusive jurisdiction of the courts in Surat, Gujarat. This
                    clause does not affect any mandatory consumer protections
                    applicable under the laws of the country where the Services
                    are directed.
                </p>
            </div>

            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-semibold mb-5">
                    6. Governing Law and Dispute Resolution
                </h1>
                <ul className="list-disc list-outside text-black font-semibold ps-5 md:ps-6 lg:ps-9 flex flex-col gap-3 text-lg/9">
                    <li>
                        This Agreement shall be governed by and construed in
                        accordance with the laws of India, excluding conflict of
                        laws principles. Any disputes arising from or in
                        connection with this Agreement or the Services shall be
                        subject to the exclusive jurisdiction of the courts in
                        Surat, Gujarat. This clause does not affect any
                        mandatory consumer protections applicable under the laws
                        of the country where the Services are directed.
                    </li>
                </ul>
            </div>

            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-semibold mb-5">
                    7. General Terms
                </h1>
                <ul className="list-disc list-outside text-black font-semibold ps-5 md:ps-6 lg:ps-9 flex flex-col gap-3 text-lg/9">
                    <li>
                        Here are some important details about the Contract. In
                        case any provision of the Contract is held invalid,
                        illegal or unenforceable, the validity, legality and
                        enforceability of the remaining provisions shall not in
                        any way be affected or impaired thereby and such
                        provision shall be ineffective only to the extent of
                        such invalidity, illegality or unenforceability. Headsin
                        does not monitor the communication between you and any
                        prospective jobseekers - all users on Headsin including
                        but not limited to candidates seeking jobs or
                        participating in the general community and employers
                        seeking to hire candidates - are responsible for their
                        own actions and Headsin does not accept any
                        responsibility This Contract (including additional terms
                        that may be provided by us when you engage with a
                        feature of the Services) is the only agreement between
                        us regarding the Services and supersedes all prior
                        agreements for the Services. If we don't act to enforce
                        a breach of this Contract, that does not mean that
                        HEADSIN has waived its right to enforce this Contract.
                        You may not assign or transfer this Contract (or your
                        membership or use of Services) to anyone without our
                        consent. However, you agree that HEADSIN may assign this
                        Contract to its affiliates or a party that buys it
                        without your consent. There are no third-party
                        beneficiaries to this Contract. You agree that the only
                        way to provide us legal notice is at the addresses
                        provided in Section 10.
                    </li>
                </ul>
            </div>

            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-semibold mb-5">
                    8. HEADSIN "Dos and Don'ts"
                </h1>
                <p className="text-[#3F1562] text-2xl font-semibold">
                    8.1. Dos
                </p>
                <ul className="list-decimal list-outside text-black font-semibold ps-5 md:ps-6 lg:ps-9 flex flex-col gap-3 text-lg/9">
                    <li>
                        Comply with all applicable laws, including, without
                        limitation, privacy laws, intellectual property laws,
                        anti-spam laws, export control laws, tax laws, and
                        regulatory requirements;
                    </li>
                    <li>
                        Provide accurate information to us and keep it updated;
                    </li>
                    <li>Use the Services in a professional manner.</li>
                </ul>

                <p className="text-[#3F1562] text-2xl font-semibold">
                    8.2. Don'ts
                </p>
                <p className="text-black font-semibold text-lg/9 ">
                    You agree that you will not:
                </p>
                <ul className="list-decimal list-outside text-black font-semibold ps-5 md:ps-6 lg:ps-9 flex flex-col gap-3 text-lg/9">
                    <li>
                        Create a fake profile on HEADSIN, misrepresent your
                        identity, impersonate anyone, create a Member profile
                        for anyone other than yourself (a real person), or use
                        or attempt to use another's account;
                    </li>
                    <li>
                        Directly or indirectly scrape the Services or otherwise
                        copy profiles and other data from the Services;
                    </li>
                    <li>
                        Try to circumvent any access controls or use limits of
                        the Service (such as caps on keyword searches or profile
                        views);
                    </li>
                    <li>
                        Copy, use, disclose or distribute any information
                        obtained from the Services, whether directly or through
                        third parties (such as search engines), without the
                        consent of HEADSIN;
                    </li>
                    <li>
                        Breach your confidentiality obligations by disclosing
                        information you do not have the consent to disclose;
                    </li>
                    <li>Violate anyone's intellectual property rights;</li>
                    <li>
                        Violate the intellectual property or other rights of
                        HEADSIN;
                    </li>
                    <li>
                        Post anything that contains software viruses, worms, or
                        any other harmful code;
                    </li>
                    <li>
                        Reverse engineer, decompile, disassemble, decipher or
                        otherwise attempt to derive the source code for the
                        Services or any related technology that is not open
                        source;
                    </li>
                    <li>
                        Imply or state that you are affiliated with or endorsed
                        by HEADSIN without our express consent (e.g.,
                        representing yourself as an accredited HEADSIN trainer);
                    </li>
                    <li>
                        Monetize in any manner Services or related data or
                        access to the same, without HEADSIN's consent;
                    </li>
                    <li>
                        Deep-link to our Services for any purpose other than to
                        promote your profile or a Group on our Services, without
                        HEADSIN's consent;
                    </li>
                    <li>
                        Use bots or other automated methods to access the
                        Services, add or download contacts, send or redirect
                        messages;
                    </li>
                    <li>
                        Monitor the Services' availability, performance or
                        functionality for any competitive purpose;
                    </li>
                    <li>
                        Engage in "framing," "mirroring," or otherwise
                        simulating the appearance or function of the Services;
                    </li>
                    <li>
                        Overlay or otherwise modify the Services or their
                        appearance (such as by inserting elements into the
                        Services or removing, covering, or obscuring an
                        advertisement included on the Services);
                    </li>
                    <li>
                        Interfere with the operation of, or place an
                        unreasonable load on, the Services (e.g., spam, denial
                        of service attack, viruses, gaming algorithms); and/or
                    </li>
                    <li>
                        Violate the Professional Community Policies or any
                        additional terms concerning a specific Service that are
                        provided when you sign up for or start using such
                        Service, where applicable.
                    </li>
                    <li>
                        Act as a consultant or middleman or in any similar
                        capacity or charge any fee for providing recruitment or
                        related services.
                    </li>
                    <li>Willingly participate in any harassment or fraud</li>
                </ul>
            </div>

            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-semibold mb-5">
                    9. Complaints Regarding Content
                </h1>
                <ul className="list-disc list-outside text-black font-semibold ps-5 md:ps-6 lg:ps-9 flex flex-col gap-3 text-lg/9">
                    <li>
                        We respect the intellectual property rights of others.
                        We require that information posted by Members be
                        accurate and not in violation of the intellectual
                        property rights or other rights of third parties.
                    </li>
                </ul>
            </div>

            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-semibold mb-5">10. Refunds</h1>
                <ul className="list-disc list-outside text-black font-semibold ps-5 md:ps-6 lg:ps-9 flex flex-col gap-3 text-lg/9">
                    <li>
                        Headsin reserves the right to reject companies that are
                        trying to commit fraud or hiring for Multi-Level
                        Marketing schemes. Any money paid in this case will not
                        be refunded.
                    </li>
                </ul>
            </div>

            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-semibold mb-5">
                    11. How To Contact Us
                </h1>
                <ul className="list-disc list-outside text-black font-semibold ps-5 md:ps-6 lg:ps-9 flex flex-col gap-3 text-lg/9">
                    <li>
                        We have authorized representatives who oversee all kinds
                        of queries, issues and complaints. However, these
                        queries, issues, and complaints will be meticulously
                        examined and scrutinized before we revert. For general
                        inquiries and legal notices - you may write us at these{" "}
                        <a
                            href="mailto:contact@headsin.co"
                            target="_blank"
                            className="underline text-[#3F1562]"
                        >
                            contact@headsin.co
                        </a>
                    </li>
                </ul>
                <p className="text-[#3F1562] text-2xl font-semibold">
                    HEADSIN Hire Guidelines for Employers
                </p>
                <ul className="list-disc list-outside text-black font-semibold ps-5 md:ps-6 lg:ps-9 flex flex-col gap-3 text-lg/9">
                    <li>
                        We request you to ensure that your actions do not
                        negatively impact the users in any manner.
                    </li>
                    <li>
                        These Professional Community Guidelines ensure that the
                        exchange on our platform is free of inappropriate and
                        unwanted content or behavior. These Guidelines, which we
                        continue to develop, provide guidance and rules for the
                        use of our services. You are requested to act
                        responsibly. We request you to bring to our attention
                        anything that you may believe violates our policies. You
                        are requested to report such actions on{" "}
                        <a
                            href="mailto:contact@headsin.co"
                            target="_blank"
                            className="underline text-[#3F1562]"
                        >
                            contact@headsin.co
                        </a>{" "}
                        These reports, along with our{" "}
                        <span className="font-extrabold">
                            automated defenses
                        </span>
                        , help us identify and prevent abuse and misbehavior.
                        Please use the reporting tools responsibly and only for
                        their intended purposes and not for unnecessary
                        harassing other users. A violation of these policies may
                        result in us taking enforcement actions. Depending on
                        the severity of the violation and a member's behavior or
                        account history, we may block your account permanently.
                    </li>

                    <ul className="list-decimal list-outside text-black font-semibold ps-5 md:ps-6 lg:ps-9 flex flex-col gap-3 text-lg/9">
                        <li>
                            {" "}
                            <b className="text-xl">Be trustworthy.</b> Please do
                            not use fake profiles. We request you to provide
                            only real name and accurate information. Please do
                            not use any information which may be considered
                            misleading or deceptive.
                        </li>
                        <li>
                            <b className="text-xl"> Be professional.</b> Please
                            do not communicate in a manner which may be
                            considered offensive or inappropriate. When creating
                            content, we ask that you keep it professional,
                            relevant, and on-topic. We request you to not use
                            the services to shock or intimidate others. Sharing
                            graphic, obscene, or pornographic content on the
                            services is prohibited.
                        </li>
                        <li>
                            {" "}
                            <b className="text-xl">Be Safe.</b> We strive to
                            maintain a civil and friendly community for our
                            members. The services shouldn't be used to harm
                            others or their careers or business prospects or to
                            air personal grievances and disputes. Please do not
                            harass, abuse, or send other unwelcome
                            communications to people (e.g., romantic advances,
                            sexually explicit content, junk mail, spam, chain
                            letters, phishing schemes). We do not allow hate
                            speech, hate groups, terrorists, or those who engage
                            in violent crimes on the services.
                        </li>
                        <li>
                            <b className="text-xl">
                                Respect others' rights and follow the law.
                            </b>{" "}
                            Do not violate any third-party intellectual property
                            rights. he services should not be used for illegal
                            activities, promoting illegal products, or violating
                            the rights of others. Don't use the services to
                            commit fraud or to try to trick others. Also, don't
                            use the services to intentionally distribute
                            viruses, worms, or other software that can destroy
                            or interrupt others' data or computer devices.
                        </li>
                        <li>
                            <b className="text-xl">Respect HEADSIN's rights.</b>{" "}
                            Don't violate the rights of HEADSIN. For more
                            information about what this means, see our User
                            Agreement. It's not okay to suggest that you're
                            affiliated with or endorsed by HEADSIN when you're
                            not. Don't violate our intellectual property rights,
                            scrape the services, or interfere with or disrupt
                            the services.
                        </li>
                    </ul>
                </ul>
            </div>
        </div>
    );
};

export default CodeofConduct;
