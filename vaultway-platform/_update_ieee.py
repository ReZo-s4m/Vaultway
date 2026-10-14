# -*- coding: utf-8 -*-
"""Update the Vaultway IEEE paper so claims match the current build."""
from docx import Document
from docx.oxml import OxmlElement
from docx.text.paragraph import Paragraph

SRC = r"c:\Users\bolla\Downloads\Vaultway_IEEE_Final_Documentation_Same_Structure_before_progress_update.docx"
OUT = r"c:\Users\bolla\Downloads\Vaultway_IEEE_Updated_With_Progress.docx"


def set_text(paragraph, text):
    if paragraph.runs:
        paragraph.runs[0].text = text
        for run in paragraph.runs[1:]:
            run.text = ""
    else:
        paragraph.add_run(text)


def insert_after(paragraph, text, style):
    new_p = OxmlElement("w:p")
    paragraph._p.addnext(new_p)
    new_para = Paragraph(new_p, paragraph._parent)
    new_para.style = style
    new_para.add_run(text)
    return new_para


def main():
    doc = Document(SRC)
    p = doc.paragraphs

    set_text(
        p[6],
        "Cloud-based file storage has simplified the process of storing and sharing digital content, but conventional file-sharing systems often require users to rely on platform-level security and access controls to protect sensitive information. A secure file-sharing system must therefore address confidentiality, authentication, authorization, controlled sharing, and accountability throughout the file lifecycle. This paper presents Vaultway, a cloud-based secure file-sharing platform designed around application-level encryption and permission-controlled access. The system is organized as a Next.js 15 frontend, a Node.js and Express backend, Prisma ORM, Supabase PostgreSQL, and private Supabase Storage. In the proposed pipeline, uploaded file data is encrypted on the server with AES-256-GCM before ciphertext is written to cloud object storage. Authentication is designed around JWT sessions and bcrypt password hashing, and authorization is designed to decide who may use a file or folder. The design also includes folders, trash and restore, share links with expiry, an optional password, a view limit, download permission, and link revocation, plus activity records and notifications. At the present stage, the database schema, the encryption and token utilities, the authorization middleware, and the API security middleware are in place, and a working website lets a person sign in, organize files, and create a share link in the browser. Joining that website to the encrypted storage API is the next implementation step. The paper presents the architecture, the secure file lifecycle, the access-control workflow, the technology stack, the current build, and a comparison with ordinary cloud file sharing.",
    )

    set_text(
        p[11],
        "Vaultway addresses these requirements through a layered full-stack architecture. The application uses Next.js 15 and TypeScript for the screens and Node.js with Express for the REST API. Prisma provides typed access to Supabase PostgreSQL, and Supabase Storage is the private object store chosen for ciphertext. In the target design, the backend encrypts a file with AES-256-GCM before writing it to a private bucket, and PostgreSQL keeps the metadata and the access rules separately. The encrypt and decrypt functions, and the database columns that store the initialization vector and the authentication tag, are already in the project. The upload route that calls them is not connected yet.",
    )

    set_text(
        p[12],
        "The platform is also designed to share a file through a controlled link instead of exposing the stored object. A share can carry an expiry time, a password, a view limit, a download permission, and a revocation flag. Those fields exist in the database design and on the sharing screen. Server middleware that checks a token and a role is written. The file, folder, and share routes that will use it are the next stage. The screens that can be used today keep their data in the browser, so the workflow can be tried before that connection is made.",
    )

    set_text(
        p[13],
        "The remainder of this paper is organized as follows. Section II reviews related work. Section III presents the proposed architecture and the core security workflows. Section IV describes the technology stack and what is built today. Section V compares the proposed design with conventional file sharing and states the present boundary of the build. Section VI concludes the paper and lists the remaining work.",
    )

    set_text(
        p[18],
        "JSON Web Tokens provide a standardized mechanism for representing claims between parties in a web application [5]. Password authentication must also protect stored credentials against direct disclosure. Modern password-hashing approaches such as bcrypt are designed to make offline password cracking substantially more expensive than storing plaintext or simple hashes [6]. These mechanisms are the foundation of Vaultway's authentication design. Token signing and verification are implemented, and the database seed hashes an administrator password with bcrypt. The register, login, refresh, and logout routes that will call them are not published yet.",
    )

    set_text(
        p[19],
        "The Zero Trust Architecture proposed by NIST emphasizes that access should not be granted solely because a user or device is located within a trusted network boundary [7]. Instead, access should be evaluated according to identity, policy, and resource requirements. Vaultway follows this principle in its design: a protected file operation is meant to require an authenticated API call and an ownership or permission check. The access-token check and the role check are written as middleware. They are not yet attached to file or share routes.",
    )

    set_text(
        p[20],
        "Application security guidance also recommends defense-in-depth controls including input validation, secure headers, rate limiting, and careful session handling [8]. The running API already applies Helmet security headers, an origin allow-list, request rate limiting, and a single error handler. Zod is included for request validation and will be applied as each feature route is added. Token checks exist as reusable middleware and will be enforced on those routes.",
    )

    set_text(
        p[24],
        "Vaultway follows a layered architecture consisting of a presentation layer, a REST API, security middleware, application services, a repository layer, a relational database, and private object storage. The architecture separates the screens from the business rules and from storage. In the target path, the website calls Express over HTTP, and services coordinate encryption, authorization, file management, and sharing. That service layer is the next part of the build. The website that exists today already lets a person walk through the same workflows on their own device.",
    )

    set_text(
        p[27],
        "The primary security mechanism of Vaultway is application-level AES-256-GCM encryption. In the upload design, Express receives the file through Multer memory storage and passes the buffer to a Node.js encryption utility. Each file receives a fresh 12-byte initialization vector. AES-256-GCM then produces ciphertext and a 16-byte authentication tag. The ciphertext is stored in the private Supabase bucket named vault-files. PostgreSQL keeps the storage path, the vector, the tag, the checksum, and the file metadata on a version record. The encryption and decryption functions are implemented. The route that receives an upload, writes the ciphertext, and later decrypts it for an authorized download is not mounted yet.",
    )

    set_text(
        p[31],
        "Vaultway is designed to authenticate people with JSON Web Tokens and to store passwords only as bcrypt hashes. The planned operations are registration, login, session refresh, logout, and retrieval of the current user. Access tokens are meant to authorize API requests. Refresh tokens are stored only as SHA-256 hashes, so the raw token is not kept in the database. Signing, verification, and the authentication middleware are implemented. The sign-in and sign-up screens that run today are a local demonstration. They accept a test account and accounts created in the browser. They do not yet call the API, and they are not the secure authentication design.",
    )

    set_text(
        p[32],
        "The data model distinguishes ADMIN and USER roles. A seed script creates those roles and can create an initial administrator when the administrator environment values are set. Authentication establishes identity. Authorization then decides whether that identity may use a requested resource. File operations are designed to add an ownership or permission check. Helmet, cross-origin rules, and rate limiting already protect the API process. Request validation with Zod will sit in front of each new route.",
    )

    set_text(
        p[34],
        "The signed-in workspace lets a person upload files, place them in folders, rename them, mark favourites, move them to trash, restore them, and delete them permanently. The same actions exist for folders, including nested folders. The interface shows a storage quota of 5 GB, which matches the default quota in the user table. These actions currently run in the browser and are saved for the signed-in person on that device. They show the intended product behaviour. They do not yet encrypt the file or write it to Supabase.",
    )

    set_text(
        p[35],
        "The backend is arranged so that routes, controllers, services, and repositories can stay separate. That is the structure that will own these rules. Only the health route is mounted today. It reports whether the API is up and whether PostgreSQL answers a simple query. The file, folder, share, activity, notification, and admin routes are named in the router and will be connected in the following phases.",
    )

    set_text(
        p[37],
        "Controlled sharing is designed so a private storage object is never handed out directly. A share record can hold an expiry time, a password hash, a maximum view count, a download permission, and a revoked flag. The sharing screen already lets a person create a link with those choices: view or download permission, an optional password, an expiry of one hour, one day, seven days, or thirty days, and an optional view limit. The link is generated in the browser. The server checks that will reject an expired, revoked, or over-used link are specified. They are not yet executed by the API.",
    )

    set_text(
        p[40],
        "Activity logs and notifications are part of the database design. The actions prepared in the schema include register, login, logout, upload, download, delete, restore, rename, move, copy, share, permission changes, and folder creation or deletion. Notification types cover upload, share, permission changes, completed downloads, and storage that is almost full. The workspace already keeps a short local history of uploads, renames, shares, trash, and restores. Server-side logging and notifications will be written when those routes are connected.",
    )

    set_text(
        p[42],
        "Vaultway is a TypeScript application split into three npm workspaces: the website, the API, and a shared package of common enums and data shapes. The website uses Next.js 15 with the App Router. The API uses Node.js and Express, with Prisma for the database and the Node.js crypto module for encryption. JSON Web Token helpers, bcrypt password hashing, Multer, and Zod are included as dependencies. Supabase is the configured provider for PostgreSQL and for a private storage bucket. The API currently answers a health check and is ready for the feature routes.",
    )

    set_text(
        p[45],
        "The website includes the public pages and the signed-in workspace. Public pages introduce the product and cover security, pricing, solutions, resources, and separate pages for storage, sharing, transfer, and media. Account pages cover sign-in, sign-up, and password recovery. The workspace covers the drive, recents, favourites, shared items, media, object storage, trash, a device centre, account, and settings. Tailwind CSS styles the interface. Axios is configured to call the API and to attach an access token once login is connected. Until that connection is made, sign-in and the file workspace use browser storage.",
    )

    set_text(
        p[47],
        "The API is an Express application. Security headers, cross-origin rules, cookie parsing, request logging, a JSON body limit, rate limiting of 90 requests per minute, a not-found handler, and a central error handler are active. Middleware can require a valid access token and can require the ADMIN or USER role. Encryption helpers can encrypt and decrypt a buffer with AES-256-GCM, create a share token, and compute a SHA-256 digest. Prisma is configured with a pooled database connection for the application and a direct connection for migrations. Routes for authentication, users, files, folders, shares, activity, notifications, and administration are identified in the router and are not active yet.",
    )

    set_text(
        p[49],
        "The Prisma schema defines roles, users, refresh tokens, password-reset tokens, email-verification tokens, folders, files, file versions, shares, permissions, activity logs, and notifications. A file version stores the bucket, the storage path, a checksum, the initialization vector, the authentication tag, and the algorithm name, which defaults to aes-256-gcm. A share stores the link token, an optional password hash, the permission, the download flag, the expiry, the view limit, the view count, and the revocation flag. Users have a default storage quota of 5 GB. A seed script creates the ADMIN and USER roles and can create an administrator when those environment values are set. Applying this schema in Supabase and writing ciphertext into the private bucket are the operational steps that follow. The running upload flow does not exercise them yet.",
    )

    set_text(
        p[51],
        "Vaultway is designed as several controls working together, rather than as one control. The controls that already protect live API requests are Helmet, the origin allow-list, rate limiting, and centralized error handling. The controls that exist as reusable code, and are not yet called by a feature route, are AES-256-GCM encryption, JSON Web Token signing and verification, role checks, and bcrypt hashing in the database seed. The controls that are specified in the schema and on the screens, and that still need server routes, are ownership checks, share-policy checks, activity logging, and notifications. Only the first group is enforced on requests today.",
    )

    set_text(
        p[54],
        "TABLE II. COMPARATIVE ANALYSIS OF THE PROPOSED DESIGN WITH EXISTING APPROACHES",
    )

    set_text(
        p[55],
        "Vaultway's primary distinction is not a new cryptographic algorithm. The contribution is the combination of established mechanisms in one application: encryption before storage, private objects, authenticated API access, controlled share links, and an activity record. Table II compares that proposed design with ordinary cloud storage, basic file sharing, and encrypted cloud storage. A Yes in the Vaultway column means the design includes the feature. It does not mean that every feature is enforced by the server today.",
    )

    set_text(
        p[56],
        "The architecture shows how cloud file sharing can be treated as confidentiality, authentication, authorization, controlled collaboration, and accountability together. The most important security property of the design is that AES-256-GCM runs before the object store, so the storage layer receives ciphertext rather than the original file. The encryption function that does this is written. It still has to be called from the upload route.",
    )

    set_text(
        p[59],
        "The layered API is intended to keep request handling, business rules, and database access in separate places, so security checks have a clear home. That split is prepared. The feature services are not filled in yet. Evaluation still has to cover functional tests, authorization tests, upload and download time, encryption overhead, storage reliability, and whether people can complete the main tasks. Those measurements belong after the website is connected to the API.",
    )

    set_text(
        p[61],
        "This paper presented Vaultway, a cloud-based secure file-sharing platform designed around application-level encryption, private cloud storage, authenticated access, and controlled sharing. The design brings together Next.js 15, Node.js, Express, Prisma, Supabase PostgreSQL, private Supabase Storage, JSON Web Tokens, bcrypt password hashing, AES-256-GCM, role checks, file and folder management, controlled share links, and security middleware. The present build has the project structure, the full database design, the security utilities, a protected API shell, and a website that demonstrates the user workflows.",
    )

    set_text(
        p[62],
        "The central design principle is that the backend encrypts a file before writing it to cloud object storage. An authorized download is meant to load the ciphertext, check ownership or a share rule, decrypt it in the backend, and return the file. This is a server-managed model. It is not zero-knowledge storage and it is not client-side end-to-end encryption. The encrypt and decrypt functions exist. The upload and download routes that complete this path are the next piece of work.",
    )

    set_text(
        p[63],
        "Sharing is designed to be more than a plain link. A link can expire, require a password, limit views, allow or refuse download, and be revoked. The sharing screen already offers those choices, and the database can store them. Activity logs and notifications are specified so that important events remain visible. They are not yet recorded by the server.",
    )

    set_text(
        p[64],
        "The remaining work is to connect the website to the API. That means registration and login against PostgreSQL, encrypted upload and authorized download through the private bucket, folder and file routes, server-side share checks, activity logs, notifications, and an administrator view. After that connection, the project needs functional and authorization tests, measurements of upload time and encryption cost, and deployment of the website, the API, and Supabase. Later security improvements may include envelope encryption for key management, a written threat model, tamper-evident audit records, and stronger checks on who receives a share.",
    )

    # Insert the progress subsection immediately before Section V.
    discussion = None
    for para in doc.paragraphs:
        if para.text.strip().startswith("V. DISCUSSION"):
            discussion = para
            break
    if discussion is None:
        raise SystemExit("Section V heading not found")

    heading_style = doc.paragraphs[44].style
    body_style = doc.paragraphs[45].style

    # insert_after places the new paragraph directly after the anchor,
    # so insert from last to first relative to the security-controls paragraph.
    anchor = discussion._p.getprevious()
    # The previous element is the last body paragraph of Section IV.
    # Insert by walking forward from that paragraph object.
    security_para = None
    for para in doc.paragraphs:
        if para._p is anchor:
            security_para = para
            break
    if security_para is None:
        raise SystemExit("Could not locate the paragraph before Section V")

    e_heading = insert_after(security_para, "E. Current Build", heading_style)
    e_body_1 = insert_after(
        e_heading,
        "Work completed so far covers four things that can be demonstrated. First, the repository is split into the website, the API, and a shared package, and both applications can be started together. Second, the database design is complete for users, roles, folders, files, encrypted file versions, shares, permissions, activity, and notifications, and a seed script creates the two roles. Third, the API process already applies security headers, origin checks, and rate limiting, and it can report database health. Fourth, the encryption function, the token helpers, and the role middleware are written and ready to be called.",
        body_style,
    )
    insert_after(
        e_body_1,
        "The website is far enough along to show the product. A person can open the public pages, create a demonstration account, enter the drive, upload and organize files, use trash and favourites, and create a share link with an expiry, a password, and a view limit. That demonstration stores its session and its files in the browser. It is a preview of the workflow, not the secure storage path. The gap between the two is specific: the screens do not yet call the feature routes, and those routes are not mounted. Closing that gap is the next phase, before testing and deployment.",
        body_style,
    )

    # Table II header: the last column is the proposed design, not a finished deployment.
    table = doc.tables[1]
    header = table.rows[0].cells[-1]
    if header.paragraphs and header.paragraphs[0].runs:
        header.paragraphs[0].runs[0].text = "Vaultway (proposed)"
        for run in header.paragraphs[0].runs[1:]:
            run.text = ""
    else:
        header.text = "Vaultway (proposed)"

    doc.save(OUT)
    print("saved", OUT)


if __name__ == "__main__":
    main()
