import { CODE_OF_CONDUCT, PRIVACY_POLICY } from "@/routes";
import React, { useEffect } from "react";

const TermsofService: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="flex flex-col text-pretty p-4 md:p-8 lg:p-15 gap-8 font-manrope h-full w-full overflow-y-auto ">
            <p className="text-black text-3xl text-center sm:text-start sm:text-5xl md:text-6xl lg:text-7xl  font-extrabold font-manrope">
                TERMS OF <span className="text-primary">SERVICE</span>
            </p>

            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-semibold">1. Usage of HeadsIn</h1>
                <ol className="list-[lower-alpha] list-outside text-black font-semibold ps-6 md:ps-12 lg:ps-15 flex flex-col gap-3 text-lg/9">
                    <li>
                        The HeadsIn Platform (including any mobile based
                        applications, website and web applications) is provided
                        by HeadsIn Inc. <b>(HeadsIn Time”)</b> either directly
                        or through its affiliates including but not limited to
                        HeadsIntime Tech Private Limited{" "}
                        <b>(“HeadsIn India”)</b>. Through the HeadsIn Platform
                        any person with a verified account can post jobs{" "}
                        <b>"Job Poster"</b>. to the HeadsIn Platform, access and
                        participate in the services provided by HeadsIn. By
                        using HeadsIn Platform, you consent to the terms of the
                        Terms of Service in addition to our Privacy Policy.
                    </li>
                    <li>
                        A Job Poster accessing the HeadsIn Platform shall be
                        bound by these Terms of Service, and all other rules,
                        regulations and terms of use referred to herein or
                        provided by HeadsIn in relation to any services provided
                        via the HeadsIn Platform <b>(“HeadsIn Services”)</b>.
                    </li>
                    <li>
                        HeadsIn shall be entitled to modify these Terms of
                        Service, rules, regulations and terms of use referred to
                        herein or provided by HeadsIn in relation to any HeadsIn
                        Services, at any time, by posting the same on the
                        HeadsIn Platform. Use of HeadsIn constitutes the Job
                        Poster's acceptance of such modified Terms of Service,
                        rules, regulations and terms of use referred to to
                        herein or provided by HeadsIn in relation to HeadsIn
                        Services, as may be amended from time to time. HeadsIn
                        may, at its sole discretion, also notify the Job Poster
                        of any change or modification in these Terms of Service,
                        rules, regulations and terms of use referred to herein
                        or provided by HeadsIn, by way of sending an email to
                        the Job Poster's registered email address or posting
                        notifications in the Job Poster accounts. The Job Poster
                        may then exercise the options provided in such an email
                        or notification to indicate non-acceptance of the
                        modified Terms of Service, rules, regulations and terms
                        of use referred to herein or provided by HeadsIn. If
                        such options are not exercised by the Job Poster within
                        the time frame prescribed in the email or notification,
                        the Job Poster will be deemed to have accepted the
                        modified Terms of Service, rules, regulations and terms
                        of use referred to herein or provided by HeadsIn.
                    </li>
                    <li>
                        Certain HeadsIn Services being provided on HeadsIn may
                        be subject to additional rules and regulations set down
                        in that respect. To the extent that these Terms of
                        Service are inconsistent with the additional conditions
                        set down, the additional conditions shall prevail.
                    </li>
                    <li>HeadsIn may, at its sole and absolute discretion:</li>
                    <ul className="list-[lower-roman] list-outside text-black font-semibold ps-5 md:ps-6 lg:ps-9 flex flex-col gap-3 text-lg/9">
                        <li>
                            Restrict, suspend, or terminate any Job Poster's
                            access to all or any part of the HeadsIn Platform or
                            HeadsIn Services;
                        </li>
                        <li>
                            Change, suspend, or discontinue all or any part of
                            the HeadsIn Platform or HeadsIn Services;
                        </li>
                        <li>
                            Reject, move, or remove any material that may be
                            submitted by a Job Poster;{" "}
                        </li>
                        <li>
                            Move or remove any content that is available on the
                            HeadsIn Platform;{" "}
                        </li>
                        <li>
                            Deactivate or delete a Job Poster's account and all
                            related information and files on the account;
                        </li>
                        <li>
                            Establish general practices and limits concerning
                            use of HeadsIn Platform;{" "}
                        </li>
                        <li>
                            Assign its rights and liabilities to all Job Poster
                            accounts hereunder to any entity (post such
                            assignment intimation of such assignment shall be
                            sent to all Job Posters to their registered email
                            ids).
                        </li>
                    </ul>
                    <li>
                        In the event any Job Poster breaches, or HeadsIn
                        reasonably believes that such Job Poster has breached
                        these Terms of Service, or has illegally or improperly
                        used the HeadsIn Platform or HeadsIn Services, HeadsIn
                        may, at its sole and absolute discretion, and without
                        any notice to the Job Poster, restrict, suspend or
                        terminate such Job Poster's access to all or any part of
                        the HeadsIn Platform, deactivate or delete the Job
                        Poster's account and all related information on the
                        account, delete any content posted by the Job Poster on
                        HeadsIn and further, take technical and legal steps as
                        it deems necessary.
                    </li>
                    <li>
                        If HeadsIn charges its Job Posters a platform fee in
                        respect of any HeadsIn Services, HeadsIn shall, without
                        delay, repay such platform fee in the event of
                        suspension or removal of the Job Poster's account or
                        HeadsIn Services on account of any negligence or
                        deficiency on the part of HeadsIn, but not if such
                        suspension or removal is affected due to:
                    </li>
                    <ul className="list-[lower-roman] list-outside text-black font-semibold ps-5 md:ps-6 lg:ps-9 flex flex-col gap-3 text-lg/9">
                        <li>
                            any breach or inadequate performance by the Job
                            Poster of any of these Terms of Service; or
                        </li>
                        <li>
                            any circumstances beyond the reasonable control of
                            HeadsIn.{" "}
                        </li>
                    </ul>
                    <li>
                        By accepting these Terms of Service Job Posters are
                        providing their consent to receiving communications such
                        as announcements, administrative messages and
                        advertisements from HeadsIn or any of its partners,
                        licensors or associates.
                    </li>
                </ol>
            </div>

            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-semibold">2. Participation</h1>
                <ol className="list-[lower-alpha] list-outside text-black font-semibold ps-6 md:ps-12 lg:ps-15 flex flex-col gap-3 text-lg/9 ">
                    <li>
                        When accessing and interacting with the HeadsIn Platform
                        and HeadsIn Services a Job Poster will be able to post
                        jobs to source and hire potential candidates and
                        employees for the Job Poster's organization, view the
                        profiles of suitable candidates who have the requisite
                        skills and experience for the particular job(s) that the
                        Job Poster is hiring for and schedule interviews with
                        potential candidates/employees.
                    </li>
                    <li>
                        To post a job a Job Poster shall be required to provide
                        information about the job such as the job role, whether
                        the job is part-time or full time, the days of work,
                        work timings, the salary range for the job, the number
                        of openings for the said job the minimum education level
                        and the level of experience required for the job. While
                        HeadsIn does not tolerate or allow for discrimination on
                        the basis of gender, HeadsIn also recognizes that
                        certain jobs might be gender specific and Job Posters
                        have the option of specifying whether a job is gender
                        specific. By agreeing to these Terms of Service and
                        while posting a job on the HeadsIn Platform, Job Posters
                        undertake that all information posted about a job will
                        at all times be accurate, not be misleading that the Job
                        Poster is not indulging in any discriminatory practices.
                        The Job Poster understands and acknowledges that any
                        incorrect information or misrepresentations about a job
                        will affect the efficacy of the HeadsIn Platform and
                        HeadsIn Services and that HeadsIn shall have the right
                        to remove a job posting or suspend the Job Poster's
                        account.
                    </li>
                    <li>
                        If you post a job on HeadsIn, it will remain active for
                        a maximum of 60 days from the date of posting. After
                        this period, the job post will expire and will no longer
                        be visible to candidates. Additionally, once the job
                        post expires, you will only have access to the list of
                        applicants or their applications. However, candidates
                        can reapply if the job is reposted as an active listing.
                    </li>
                    <li>
                        Job Posters agree that they shall at all times be bound
                        by and adhere to the{" "}
                        <a
                            target="_blank"
                            href={CODE_OF_CONDUCT}
                            className="underline text-primary"
                        >
                            Code of Conduct{" "}
                        </a>{" "}
                        while posting jobs through the HeadsIn Platform and
                        while using the HeadsIn Services.
                    </li>
                </ol>
            </div>

            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-semibold">
                    3. Intellectual Property
                </h1>
                <ol className="list-[lower-alpha] list-outside text-black font-semibold ps-6 md:ps-12 lg:ps-15 flex flex-col gap-3 text-lg/9 ">
                    <li>
                        The intellectual property rights{" "}
                        <b>("Intellectual Property Rights")</b> in all software
                        underlying the HeadsIn Platform and the HeadsIn Services
                        and material published on the HeadsIn Platform,
                        including (but not limited to) software, advertisements,
                        content (whether written, audio and/or visual),
                        photographs, graphics, images, illustrations, graphs,
                        charts, marks, logos, audio or video clippings,
                        animations etc. is owned by HeadsIn, its affiliates,
                        partners, licensors and/or associates. Job Posters may
                        not modify, publish, transmit, participate in the
                        transfer or sale of, reproduce, create derivative works
                        of, distribute, publicly perform, publicly display, or
                        in any way exploit any of the materials or content on
                        HeadsIn either in whole or in part without express
                        written license from HeadsIn
                    </li>
                    <li>
                        Job Posters are solely responsible for all materials
                        (whether publicly posted or privately transmitted) that
                        they upload, post, e-mail, transmit, or otherwise make
                        available via the HeadsIn Platform ("
                        <b>Job Posters' Content</b>"). Each Job Poster
                        represents and warrants that they own all Intellectual
                        Property Rights in the Job Posters’ Content and that no
                        part of the Job Poster's Content infringes any
                        third-party rights. Job Posters further confirm and
                        undertake to not display or use of the names, logos,
                        marks, labels, trademarks, copyrights or intellectual
                        and proprietary rights of any third party on the HeadsIn
                        Platform, without written authorization from such third
                        party. Job Posters agree to indemnify and hold harmless
                        HeadsIn, its directors, employees, affiliates and
                        assigns against all costs, damages, loss and harm
                        including towards litigation costs and counsel fees, in
                        respect of any third party claims that may be initiated
                        including for infringement of Intellectual Property
                        Rights arising out of such display or use of the names,
                        logos, marks, labels, trademarks, copyrights or
                        intellectual and proprietary rights on the HeadsIn
                        Platform, by such Job Poster or through the Job Poster's
                        commissions or omissions
                    </li>
                    <li>
                        Job Posters hereby grant to HeadsIn and its affiliates,
                        partners, licensors and associates a worldwide,
                        irrevocable, royalty-free, non-exclusive, sub-licensable
                        license to use, reproduce, create derivative works of,
                        distribute, publicly perform, publicly display,
                        transfer, transmit, and/or publish Job Posters' Content
                        for any of the following purposes:
                    </li>
                    <ul className="list-[lower-roman] list-outside text-black font-semibold ps-5 md:ps-6 lg:ps-9 flex flex-col gap-3 text-lg/9">
                        <li>displaying Job Posters' Content on HeadsIn</li>
                        <li>
                            distributing Job Posters' Content, either
                            electronically or via other media, to potential
                            candidates, and/or
                        </li>
                        <li>
                            storing Job Posters' Content in a remote database
                            accessible by end users, for a charge.
                        </li>
                        <li>
                            This license shall apply to the distribution and the
                            storage of Job Posters' Content in any form, medium,
                            or technology.
                        </li>
                    </ul>
                    <li>
                        All names, logos, marks, labels, trademarks, copyrights
                        or intellectual and proprietary rights on the HeadsIn
                        Platform belonging to any person (including a Job
                        Poster), entity or third party are recognized as
                        proprietary to the respective owners and any claims,
                        controversy or issues against these names, logos, marks,
                        labels, trademarks, copyrights or intellectual and
                        proprietary rights must be directly addressed to the
                        respective parties under notice to HeadsIn.
                    </li>
                </ol>
            </div>

            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-semibold">
                    4. Third Party Sites, Services and Products
                </h1>
                <ol className="list-[lower-alpha] list-outside text-black font-semibold ps-6 md:ps-12 lg:ps-15 flex flex-col gap-3 text-lg/9 ">
                    <li>
                        Links to other Internet sites or mobile applications
                        owned and operated by third parties may be provided via
                        the HeadsIn Platform. Job Posters' use of each of those
                        sites is subject to the conditions, if any, posted by
                        those sites. HeadsIn does not exercise control over any
                        Internet sites or mobile applications apart from the
                        HeadsIn Platform and cannot be held responsible for any
                        content residing in any third-party Internet site or
                        mobile application. HeadsIn's inclusion of third-party
                        content or links to third-party Internet sites or mobile
                        applications is not an endorsement by HeadsIn of such
                        third-party Internet site or mobile application.
                    </li>
                    <li>
                        Job Posters' correspondence, transactions/offers or
                        related activities with third parties including but not
                        limited to potential candidates, payment providers and
                        verification service providers, are solely between the
                        Job Poster and that third party. Job Posters'
                        correspondence, transactions and usage of the
                        services/offers of such third party shall be subject to
                        the terms and conditions, policies and other service
                        terms adopted/implemented by such third party, and the
                        Job Poster shall be solely responsible for reviewing the
                        same prior to transacting or availing of the
                        services/offers of such third party. The Job Poster
                        agrees that HeadsIn will not be responsible or liable
                        for any loss or damage of any sort incurred as a result
                        of any such transactions/offers with third parties. Any
                        questions, complaints, or claims related to any
                        third-party product or service should be directed to the
                        appropriate vendor.
                    </li>
                    <li>
                        The HeadsIn Platform contains content that is created by
                        HeadsIn as well as content provided by third parties
                        (including potential candidates). HeadsIn does not
                        guarantee the accuracy, integrity, quality of the
                        content provided by third parties and such content may
                        not relied upon by the Job Posters in utilizing the
                        HeadsIn Services provided on the HeadsIn Platform.
                    </li>
                </ol>
            </div>

            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-semibold">5. Participation</h1>
                <ol className="list-[lower-alpha] list-outside text-black font-semibold ps-6 md:ps-12 lg:ps-15 flex flex-col gap-3 text-lg/9 ">
                    <li>
                        All information collected from Job Posters, such as
                        registration (including but not limited to email
                        addresses, mobile phone numbers, government identity
                        documentation) and payment information, is subject to
                        HeadsIn's Privacy Policy which is available at{" "}
                        <a
                            href={PRIVACY_POLICY}
                            target="_blank"
                            className="underline text-primary"
                        >
                            Privacy Policy.
                        </a>
                    </li>
                    <li>
                        We do not share personal information of any individual
                        with other companies/entities without obtaining
                        permission. We may share all such information that we
                        have in our possession in accordance with our Privacy
                        Policy
                    </li>
                    <li>
                        Once the personal information has been shared with you,
                        you shall, at all times, be responsible to secure such
                        information.
                    </li>
                    <li>
                        You warrant and represent that you shall not disclose or
                        transfer personal information shared by us to any
                        sub-processors without ensuring that adequate and
                        equivalent safeguards to the personal information.
                    </li>
                    <li>
                        You, hereby agree and acknowledge that you will use the
                        information shared with you only for the purpose of the
                        Services. You shall not use such information for any
                        personal or other business purposes. In the event you
                        are found to be misusing the information shared with
                        you, we shall, at our sole discretion, delete your
                        account with immediate effect and you will be blocked
                        from using/ accessing HeadsIn Platform in future.
                    </li>
                </ol>
            </div>

            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-semibold">
                    6. Job Poster Conduct
                </h1>
                <ol className="list-[lower-alpha] list-outside text-black font-semibold ps-6 md:ps-12 lg:ps-15 flex flex-col gap-3 text-lg/9 ">
                    <li>
                        Job Posters agree to abide by these Terms of Service and
                        all other rules, regulations and terms of use of the
                        Website. In the event Job Poster does not abide by these
                        Terms of Service and all other rules, regulations and
                        terms of use, HeadsIn may, at its sole and absolute
                        discretion, take necessary remedial action, including
                        but not limited to:
                    </li>
                    <ul className="list-[lower-roman] list-outside text-black font-semibold ps-5 md:ps-6 lg:ps-9 flex flex-col gap-3 text-lg/9">
                        <li>
                            restricting, suspending, or terminating any Job
                            Poster's access to all or any part of HeadsIn
                            Services;
                        </li>
                        <li>
                            deactivating or deleting a Job Poster's account and
                            all related information and files on the account.
                            Any amount remaining unused in the Job Poster's
                            account on the date of deactivation or deletion
                            shall be transferred to the Job Poster's bank
                            account on record with HeadsIn subject to a
                            processing fee (if any) applicable on such transfers
                            as set out herein.
                        </li>
                    </ul>
                    <li>
                        Job Posters agree to provide true, accurate, current and
                        complete information at the time of registration and at
                        all other times (as required by HeadsIn). Job Posters
                        further agree to update and keep updated their
                        registration information and information related to job
                        posts made on the HeadsIn Platform.
                    </li>
                    <li>
                        A Job Poster shall not register or operate more than one
                        Job Poster account with HeadsIn.{" "}
                    </li>
                    <li>
                        Job Posters agree to ensure that they can receive all
                        communication from HeadsIn by marking e-mails or sending
                        SMSs from HeadsIn. HeadsIn shall not be held liable if
                        any e-mail/SMS remains unread by a Job Poster as a
                        result of such e-mail getting delivered to the Job
                        Poster's junk or spam folder.
                    </li>
                    <li>
                        Any password issued by HeadsIn to a Job Poster may not
                        be revealed to anyone else. Job Posters may not use
                        anyone else's password. Job Posters are responsible for
                        maintaining the confidentiality of their accounts and
                        passwords. Job Posters agree to immediately notify
                        HeadsIn of any unauthorized use of their passwords or
                        accounts or any other breach of security.
                    </li>
                    <li>
                        Job Posters agree to exit/log-out of their accounts at
                        the end of each session. HeadsIn shall not be
                        responsible for any loss or damage that may result if
                        the Job Poster fails to comply with these requirements.
                    </li>
                    <li>
                        Job Posters agree not to use cheats, exploits,
                        automation, software, bots, hacks or any unauthorized
                        third-party software designed to modify or interfere
                        with the HeadsIn Services and/or HeadsIn experience or
                        assist in such activity.
                    </li>
                    <li>
                        Job Posters agree not to copy, modify, rent, lease,
                        loan, sell, assign, distribute, reverse engineer, grant
                        a security interest in, or otherwise transfer any right
                        to the technology or software underlying HeadsIn or
                        HeadsIn’s Services.
                    </li>
                    <li>
                        Job Posters agree that without HeadsIn's express written
                        consent, they shall not modify or cause to be modified
                        any files or software that are part of HeadsIn's
                        Services or the HeadsIn Platform.
                    </li>
                    <li>
                        Job Posters agree not to disrupt, overburden, or aid or
                        assist in the disruption or overburdening of (a) any
                        computer or server used to offer or support HeadsIn or
                        the HeadsIn’s Services (each a "Server"); or (2) the
                        enjoyment of HeadsIn Services by any other Job Poster or
                        person.
                    </li>
                    <li>
                        Job Posters agree not to institute, assist or become
                        involved in any type of attack, including without
                        limitation to distribution of a virus, denial of
                        service, or other attempts to disrupt HeadsIn Services
                        or any other person's use or enjoyment of HeadsIn
                        Services.
                    </li>
                    <li>
                        Job Posters shall not attempt to gain unauthorised
                        access to Job Poster accounts, Servers or networks
                        connected to HeadsIn Services by any means other than
                        the Job Poster interface provided by HeadsIn, including
                        but not limited to, by circumventing or modifying,
                        attempting to circumvent or modify, or encouraging or
                        assisting any other person to circumvent or modify, any
                        security, technology, device, or software that underlies
                        or is part of HeadsIn Services.
                    </li>
                    <li>
                        A Job Poster shall not publish any content that is
                        patently false and untrue, and is written or published
                        in any form, with the intent to mislead or harass a
                        person, entity or agency for financial gain or to cause
                        any injury to any person.
                    </li>
                    <li>
                        Without limiting the foregoing, Job Posters agree not to
                        use HeadsIn for any of the following:
                    </li>
                    <ul className="list-[lower-roman] list-outside text-black font-semibold ps-5 md:ps-6 lg:ps-9 flex flex-col gap-3 text-lg/9">
                        <li>
                            To engage in any obscene, offensive, indecent,
                            racial, communal, anti-national, objectionable,
                            defamatory or abusive action or communication;
                        </li>
                        <li>
                            To harass, stalk, threaten, or otherwise violate any
                            legal rights of other individuals;
                        </li>
                        <li>
                            To publish, post, upload, e-mail, distribute, or
                            disseminate (collectively, "Transmit") any
                            inappropriate, profane, defamatory, infringing,
                            obscene, indecent, or unlawful content;
                        </li>
                        <li>
                            To Transmit files that contain viruses, corrupted
                            files, or any other similar software or programs
                            that may damage or adversely affect the operation of
                            another person's computer, HeadsIn, any software,
                            hardware, or telecommunications equipment;
                        </li>
                        <li>
                            To advertise, offer or sell any goods or services
                            for any commercial purpose on HeadsIn including but
                            not limited to multi-level marketing for a third
                            party, promoting business of a third party, selling
                            financial products such as loans, insurance,
                            promoting demat account openings, without the
                            express written consent of HeadsIn;
                        </li>
                        <li>
                            To download any file, recompile or disassemble or
                            otherwise affect our products that you know or
                            reasonably should know cannot be legally obtained in
                            such manner;
                        </li>
                        <li>
                            To falsify or delete any author attributions, legal
                            or other proper notices or proprietary designations
                            or labels of the origin or the source of software or
                            other material;
                        </li>
                        <li>
                            To restrict or inhibit any other Job Poster from
                            using and enjoying any public area within our sites;
                        </li>
                        <li>
                            To collect or store personal information about other
                            Job Posters;
                        </li>
                        <li>
                            To collect or store information about potential
                            candidates;
                        </li>
                        <li>
                            To mine information relating to potential candidates
                            with the aim of creating a database of potential
                            candidates whether or not such database is used or
                            meant to be used by the Job Poster or any third
                            party associated with the Job Poster or to whom such
                            Job Poster makes such mined information available,
                            for either a commercial purpose or for the Job
                            Poster’s own use at a future date;
                        </li>
                        <li>
                            To interfere with or disrupt the HeadsIn and/or the
                            HeadsIn Platform, HeadsIn servers, or HeadsIn
                            networks;
                        </li>
                        <li>
                            To impersonate any person or entity, including, but
                            not limited to, a representative of HeadsIn, or
                            falsely state or otherwise misrepresent Job Poster's
                            affiliation with a person or entity;
                        </li>
                        <li>
                            To forge headers or manipulate identifiers or other
                            data in order to disguise the origin of any content
                            transmitted through HeadsIn or to manipulate Job
                            Poster's presence on the HeadsIn Platform;
                        </li>
                        <li>
                            To take any action that imposes an unreasonably or
                            disproportionately large load on HeadsIn’s
                            infrastructure;
                        </li>
                        <li>To engage in any illegal activities.</li>
                        <li>
                            To engage in any action that threatens the unity,
                            integrity, defence, security or sovereignty of
                            India, friendly relations with foreign States, or
                            public order, or causes incitement to the commission
                            of any cognisable offence or prevents investigation
                            of any offence or is insulting other nation.
                        </li>
                    </ul>
                    <li>
                        If a Job Poster chooses a username that, in HeadsIn's
                        considered opinion is obscene, indecent, abusive or that
                        might subject HeadsIn to public disparagement or scorn,
                        or a name which is an official team/league/franchise
                        names and/or name of any sporting personality, as the
                        case may be, HeadsIn reserves the right, without prior
                        notice to the Job Poster, to restrict usage of such
                        names, which in HeadsIn’s opinion fall within any of the
                        said categories and/or change such username and intimate
                        the Job Poster or delete such username and posts from
                        HeadsIn, deny such Job Poster access to HeadsIn, or any
                        combination of these options.
                    </li>
                    <li>
                        Unauthorized access to the HeadsIn Platform is a breach
                        of these Terms of Service, and a violation of the law.
                        Job Posters agree not to access the HeadsIn Platform by
                        any means other than through the interface that is
                        provided by HeadsIn via the HeadsIn Platform for use in
                        accessing the HeadsIn Platform. Job Posters agree not to
                        use any automated means, including, without limitation,
                        agents, robots, scripts, or spiders, to access, monitor,
                        or copy any part of the HeadsIn Platform, HeadsIn
                        Services or any information available for access through
                        the HeadsIn Platform or HeadsIn Services, except those
                        automated means that HeadsIn has approved in advance and
                        in writing.
                    </li>
                    <li>
                        Use of the HeadsIn Platform is subject to existing laws
                        and legal processes. Nothing contained in these Terms of
                        Service shall limit HeadsIn's right to comply with
                        governmental, court, and law-enforcement requests or
                        requirements relating to Job Posters' use of HeadsIn.
                    </li>
                    <li>
                        Persons below the age of eighteen (18) years are not
                        allowed to register with the HeadsIn Platform. All
                        persons interested in becoming HeadsIn Job Posters might
                        be required by HeadsIn to disclose their age at the time
                        of getting access to the HeadsIn Platform. If a person
                        declares a false age, HeadsIn shall not be held
                        responsible and such person shall, in addition to
                        forfeiting any and all rights over their HeadsIn
                        account, shall indemnify and hold HeadsIn, its
                        Directors, officers, employees, agents, affiliates
                        harmless of any and all losses that may be suffered by
                        HeadsIn its Directors, officers, employees, agents,
                        affiliates by virtue of such false declaration being
                        made. In case the person making the false declaration is
                        below the age of 18 such person’s legal guardians shall
                        indemnify and hold HeadsIn, its Directors, officers,
                        employees, agents, affiliates harmless of any and all
                        losses that may be suffered by HeadsIn its Directors,
                        officers, employees, agents, affiliates by virtue of
                        such false declaration having been made by said person.
                    </li>
                    <li>
                        HeadsIn may not be held responsible for any content
                        contributed by Job Posters on the HeadsIn Platform.
                    </li>
                </ol>
            </div>

            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-semibold">7. Eligibility</h1>
                <ol className="list-[lower-alpha] list-outside text-black font-semibold ps-6 md:ps-12 lg:ps-15 flex flex-col gap-3 text-lg/9 ">
                    <li>
                        The HeadsIn Platform is open only to persons above the
                        age of 18 years.
                    </li>
                    <li>
                        Persons who wish to participate must have a valid email
                        address and/or mobile phone number.
                    </li>
                    <li>
                        HeadsIn may on receipt of information bar a person from
                        accessing their HeadsIn account if such person is found
                        to be in violation of any part of these Terms of Service
                        or the{" "}
                        <a
                            href={CODE_OF_CONDUCT}
                            target="_blank"
                            className="underline text-primary"
                        >
                            Code of Conduct
                        </a>
                        .
                    </li>
                    <li>
                        Only those Job Posters who have successfully registered
                        on the HeadsIn Platform shall be eligible to Post Jobs.
                    </li>
                </ol>
            </div>

            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-semibold">
                    8. Dispute and Dispute Resolution
                </h1>
                <ol className="list-[lower-alpha] list-outside text-black marker:font-semibold font-semibold ps-6 md:ps-12 lg:ps-15 flex flex-col gap-3 text-lg/9 ">
                    <li>
                        If any dispute arising out of, or in connection with,
                        the HeadsIn Services provided by HeadsIn via the HeadsIn
                        Platform, the construction, validity, interpretation and
                        enforceability of these Terms of Service, or the rights
                        and obligations of the Job Poster(s) or HeadsIn, as well
                        as the exclusive jurisdiction to grant interim or
                        preliminary relief in case of any dispute referred to
                        arbitration as given below arises between the Job
                        Poster(s) and HeadsIn ("<b>Dispute</b>"), the disputing
                        parties hereto shall endeavor to settle such Dispute
                        amicably. The attempt to bring about an amicable
                        settlement shall be considered to have failed if not
                        resolved within 30 (thirty) days from the date of
                        communicating the Dispute in writing.
                    </li>

                    <li>
                        If the parties are unable to amicably settle the Dispute
                        as mentioned above, any party to the Dispute shall be
                        entitled to serve a notice invoking Arbitration. The
                        Dispute shall be referred to and finally resolved by
                        arbitration. The Arbitration shall be conducted by an
                        Arbitral Tribunal consisting of a sole arbitrator in
                        accordance with the Rules of the Delhi International
                        Arbitration Centre ("
                        <b>DIAC Rules</b>"), which rules are deemed to be
                        incorporated by reference in this clause. The seat of
                        the arbitration shall be New Delhi. The language of the
                        arbitration shall be English. The law governing the
                        arbitration agreement shall be Indian Law.
                    </li>

                    <li>
                        Nothing shall preclude any Party from seeking interim or
                        permanent equitable or injunctive relief, or both, from
                        the competent courts at New Delhi, having jurisdiction
                        to grant relief on any Disputes. The pursuit of
                        equitable or injunctive relief shall not be a waiver of
                        the duty of the Parties to pursue any remedy (including
                        for monetary damages) through the arbitration described
                        herein.
                    </li>

                    <li>
                        The arbitration award will be final and binding on the
                        Parties.
                    </li>
                </ol>
            </div>

            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-semibold">
                    9. Release and Limitations of Liability
                </h1>
                <ol className="list-[lower-alpha] list-outside text-black font-semibold ps-6 md:ps-12 lg:ps-15 flex flex-col gap-3 text-lg/9 ">
                    <li>
                        Job Posters shall access the HeadsIn Services provided
                        via the HeadsIn Platform voluntarily and at their own
                        risk. HeadsIn shall, under no circumstances be held
                        responsible or liable on account of any loss or damage
                        sustained by Job Posters or any other person or entity
                        during the course of access to the HeadsIn Platform.
                    </li>
                    <li>
                        By accessing the HeadsIn Platform and HeadsIn Services
                        provided therein, Job Posters hereby release from and
                        agree to indemnify HeadsIn, and/or any of its directors,
                        employees, partners, associates and licensors, from and
                        against all liability, cost, loss or expense arising out
                        their access of the HeadsIn Platform and the HeadsIn
                        Services including (but not limited to) personal injury
                        and damage to property and whether direct, indirect,
                        consequential, foreseeable, due to some negligent act or
                        omission on their part, or otherwise.
                    </li>
                    <li>
                        HeadsIn accepts no liability, whether jointly or
                        severally, for any errors or omissions, whether on
                        behalf of itself or third parties in relation to the
                        data/information collated and published on the HeadsIn
                        Platform.
                    </li>
                    <li>
                        Job Posters shall be solely responsible for any
                        consequences which may arise due to their access of
                        HeadsIn Services by conducting an illegal act or due to
                        non-conformity with these Terms of Service and other
                        rules and regulations in relation to HeadsIn Services,
                        including provision of incorrect personal details. Job
                        Posters also undertake to indemnify HeadsIn and their
                        respective officers, directors, employees and agents on
                        the happening of such an event (including without
                        limitation cost of attorney, legal charges etc.) on full
                        indemnity basis for any loss/damage suffered by HeadsIn
                        on account of such act on the part of the Job Posters.
                    </li>
                    <li>
                        Job Posters shall indemnify, defend, and hold HeadsIn
                        harmless from any third party/entity/organization claims
                        arising from or related to such Job Poster's engagement
                        with the HeadsIn Platform. In no event shall HeadsIn be
                        liable to any Job Poster for acts or omissions arising
                        out of or related to Job Poster's engagement with the
                        HeadsIn Platform.
                    </li>
                    <li>
                        In consideration of HeadsIn allowing Job Posters to
                        access the HeadsIn Platform, to the maximum extent
                        permitted by law, the Job Posters waive and release each
                        and every right or claim, all actions, causes of actions
                        (present or future) each of them has or may have against
                        HeadsIn, its respective agents, directors, officers,
                        business associates, group companies, sponsors,
                        employees, or representatives for all and any injuries,
                        accidents, or mishaps (whether known or unknown) or
                        (whether anticipated or unanticipated) arising out of
                        the provision of HeadsIn Services.
                    </li>
                </ol>
            </div>

            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-semibold">10. Disclaimers</h1>
                <ol className="list-[lower-alpha] list-outside text-black font-semibold ps-6 md:ps-12 lg:ps-15 flex flex-col gap-3 text-lg/9 ">
                    <li>
                        To the extent permitted under law, neither HeadsIn nor
                        its parent/holding company, subsidiaries, affiliates,
                        directors, officers, professional advisors, employees
                        shall be responsible for the deletion, the failure to
                        store, the mis-delivery, or the untimely delivery of any
                        information or material.
                    </li>
                    <li>
                        To the extent permitted under law, neither HeadsIn nor
                        its parent/holding company, subsidiaries, affiliates,
                        directors, officers, professional advisors, employees
                        shall be responsible for the deletion, the failure to
                        store, the mis-delivery, or the untimely delivery of any
                        information or material.
                    </li>
                    <li>
                        To the extent permitted under law, HeadsIn shall not be
                        responsible for any harm resulting from downloading or
                        accessing any information or material, the quality of
                        servers, products, HeadsIn Services or sites.
                    </li>
                    <li>
                        Any material accessed, downloaded or otherwise obtained
                        through the HeadsIn Platform is done at the Job Poster's
                        discretion, competence, acceptance and risk, and the Job
                        Poster will be solely responsible for any potential
                        damage to Job Poster's computer system or loss of data
                        that results from a Job Poster's download of any such
                        material.
                    </li>
                    <li>
                        HeadsIn shall make best endeavours to ensure that the
                        HeadsIn(s) is error-free and secure, however, neither
                        HeadsIn nor any of its partners, licensors or associates
                        makes any warranty that:
                    </li>
                    <ol className="list-[lower-roman] list-outside text-black font-semibold ps-5 md:ps-6 lg:ps-9 flex flex-col gap-3 text-lg/9">
                        <li>
                            the HeadsIn Platform will meet Job Posters'
                            requirements,
                        </li>
                        <li>
                            HeadsIn Platform will be uninterrupted, timely,
                            secure, or error free
                        </li>
                        <li>
                            the results that may be obtained from the use of
                            HeadsIn Platform will be accurate or reliable; and
                        </li>
                        <li>
                            the quality of any products, HeadsIn Services,
                            information, or other material that Job Posters
                            purchase or obtain through the HeadsIn Platform will
                            meet Job Posters' expectations.
                        </li>
                    </ol>
                    <li>
                        In case HeadsIn discovers any error, HeadsIn reserves
                        the right (exercisable at its discretion) to rectify the
                        error in such manner as it deems fit, including through
                        a set-off of the erroneous payment from amounts due to
                        the User or deduction from the User's account of the
                        amount of erroneous payment. In case of exercise of
                        remedies in accordance with this clause, HeadsIn agrees
                        to notify the User of the error and of the exercise of
                        the remedy(ies) to rectify the same.
                    </li>
                    <li>
                        To the extent permitted under law, neither HeadsIn nor
                        its partners, licensors or associates shall be liable
                        for any direct, indirect, incidental, special, or
                        consequential damages arising out of the use of or
                        inability to use our sites, even if HeadsIn has been
                        advised of the possibility of such damages.
                    </li>
                    <li>
                        Any HeadsIn Services being hosted or provided, or
                        intended to be hosted on the HeadsIn Platform and
                        requiring specific permission or authority from any
                        statutory authority or any state or the central
                        government, or the board of directors shall be deemed
                        cancelled or terminated, if such permission or authority
                        is either not obtained or denied either before or after
                        the availability of the relevant HeadsIn Services are
                        hosted or provided.
                    </li>
                    <li>
                        To the extent permitted under law, in the event of
                        suspension or closure of any HeadsIn Services Users
                        shall not be entitled to make any demands, claims, on
                        any nature whatsoever.
                    </li>
                </ol>
            </div>

            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-semibold">
                    11. Grievance Redressal Mechanism
                </h1>
                <ol className="list-[lower-alpha] list-outside text-black font-semibold ps-6 md:ps-12 lg:ps-15 flex flex-col gap-3 text-lg/9 ">
                    <li>
                        In case a Job Poster has any complaints or grievance
                        pertaining to (i) any Content that a Job Poster believes
                        violates these Terms (other than an infringement of
                        Intellectual Property Rights), (ii) Job Posters’ access
                        to the HeadsIn Platform or (iii) any Content which a Job
                        Poster believes is, prima facie, in the nature of any
                        material which is obscene, defamatory towards the
                        complainant or any person on whose behalf such Job
                        Poster is making the complaint, or is in the nature of
                        impersonation in an electronic form, including
                        artificially morphed images of such individual, please
                        share the same with us by writing to:{" "}
                        <a
                            href="mailto:ankit.grievance@HeadsIn.co"
                            target="_blank"
                            className="underline text-primary"
                        >
                            ankit.grievance@HeadsIn.co
                        </a>
                    </li>
                    <li>
                        In the complaint or grievance, the Job Poster shall
                        include the following information:
                    </li>
                    <ol className="list-[lower-roman] list-outside text-black font-semibold ps-5 md:ps-6 lg:ps-9 flex flex-col gap-3 text-lg/9">
                        <li>
                            Name and contact details: name, address, contact
                            number and email address;
                        </li>
                        <li>
                            Relation to the subject matter of the complaint,
                            i.e. complainant or person acting on behalf of an
                            affected person;
                        </li>
                        <li>
                            The name and age of the person aggrieved or affected
                            by the subject matter of the complaint, in case the
                            Job Poster is acting on behalf of such person and a
                            statement that the Job Poster is authorised to act
                            on behalf of such person and to provide such
                            person's personal information to HeadsIn in relation
                            to the complaint/grievance;
                        </li>
                        <li>
                            Description of the complaint or grievance with clear
                            identification of the Content in relation to which
                            such complaint or grievance is made;
                        </li>
                        <li>
                            A statement that the Job Poster believes, in good
                            faith, that the Content violates these Terms and
                            Conditions;
                        </li>
                        <li>
                            A statement that the information provided in the
                            complaint or grievance is accurate.
                        </li>
                    </ol>
                    <li>
                        HeadsIn respects the Intellectual Property Rights of
                        others. All names, logos, marks, labels, trademarks,
                        copyrights or intellectual and proprietary rights on the
                        HeadsIn Platform belonging to any person (including Job
                        Poster), entity or third party are recognized as
                        proprietary to the respective owners. Job Posters are
                        requested to send HeadsIn a written notice/ intimation
                        if Job Posters notice any act of infringement on the
                        HeadsIn Platform, which must include the following
                        information:
                    </li>
                    <ol className="list-[lower-roman] list-outside text-black font-semibold ps-5 md:ps-6 lg:ps-9 flex flex-col gap-3 text-lg/9">
                        <li>
                            A clear identification of the copyrighted work
                            allegedly infringed;
                        </li>
                        <li>
                            A clear identification of the allegedly infringing
                            material on the HeadsIn Platform;
                        </li>
                        <li>
                            Contact details: name, address, e-mail address and
                            phone number;
                        </li>
                        <li>
                            A statement that the Job Poster believes, in good
                            faith, that the use of the copyrighted material
                            allegedly infringed on the HeadsIn Platform is not
                            authorized by the Job Poster's agent or the law;
                        </li>
                        <li>
                            A statement that the Job Poster believes, in good
                            faith, that the use of the copyrighted material
                            allegedly infringed on the HeadsIn Platform is not
                            authorized by the Job Poster's agent or the law;
                        </li>
                        <li>
                            A statement that the information provided in the
                            notice is accurate and that the signatory is
                            authorized to act on behalf of the owner of an
                            exclusive copyright right that is allegedly
                            infringed;
                        </li>
                        <li>
                            Job Poster's signature or a signature of the Job
                            Poster's authorized agent.
                        </li>
                    </ol>
                    <p>
                        The aforesaid notices can be sent to the Company by
                        email at:{" "}
                        <a
                            href="mailto:contact@headsin.co"
                            target="_blank"
                            className="underline text-primary"
                        >
                            contact@headsin.co.
                        </a>
                    </p>
                    <li>
                        On receiving such a complaint, grievance or notice,
                        HeadsIn reserves the right to investigate and/or take
                        such action as HeadsIn may deem appropriate. HeadsIn may
                        reach out to the Job Poster to seek further
                        clarification or assistance with the investigation, or
                        verify the statements made in the complaint, grievance
                        or notice, and the Job Poster acknowledges that timely
                        assistance with the investigation would facilitate the
                        redressal of the same.
                    </li>
                    <li>
                        The name and title of the Grievance Redressal Officer is
                        as follows:
                    </li>
                </ol>
            </div>

            <div className="text-black font-semibold ps-6 md:ps-12 lg:ps-15 flex flex-col gap-3 text-lg/9 ">
                <p>Name: Mann</p>
                <p>
                    Email:{" "}
                    <a
                        href="mailto:contact@headsin.co"
                        target="_blank"
                        className="underline text-primary"
                    >
                        contact@headsin.co
                    </a>
                </p>
                <p>Address: </p>
                <p>
                    HeadsIn Connect LLP, 2nd + 3rd Floor, Patel Ind. Society,
                    Opp. Anath Ashram, Katargam, Surat-395004 Gujarat, India
                </p>
                <p>
                    The Grievance Officer identified above pursuant to the
                    provisions of applicable laws including but not limited to
                    the Information Technology Act, 2000 and the Consumer
                    Protection Act, 2019, and the Rules enacted under those
                    laws. The Company reserves the right to replace the
                    Grievance Redressal Officer at its discretion through
                    publication of the name and title of such replacement on the
                    website, which replacement shall come into effect
                    immediately upon publication.
                </p>
            </div>
        </div>
    );
};

export default TermsofService;
