-- People: W. H. K. Bester, Lynette van Zijl, Brink van der Merwe, Walter Schulze
INSERT OR IGNORE INTO people (slug, full_name, title, role, division, email_primary, email_secondary, phone, office, bio, research_interests_json, qualifications, image_key) VALUES
('whk-bester', 'W. H. K. Bester', 'Technical Officer', 'Junior Lecturer (since 2014)', 'Computer Science Division, Department of Mathematical Sciences', 'whkbester@cs.sun.ac.za', 'whkbester@gmail.com', '+27 21 808 4232', 'A508, General Engineering Building', 'Without any formal qualification or training, I worked as a software programmer/analyst for eight years in the media industry. I was involved with system programming, web strategising, and full-text data archiving and retrieval. In 2003, I turned to university studies for an undergraduate degree in Computer Science and Mathematics at Stellenbosch University, followed by an honours and a master''s degree. I was appointed as technical officer in the Computer Science Division in 2009, and then as junior lecturer in 2014.

Besides my life in academia, I am also an active performing musician as a member of the Cape Consort, a group dedicated to historically informed performance of early music. Since 2001, I have been a freelance music and theatre critic for Die Burger (now also Netwerk24), and I occasionally broadcast on Fine Music Radio.', '["Formal languages and automata theory","Software engineering principles applied to system programming","Web systems and tooling","Efficiency and space requirements of algorithms used in system/programming libraries"]', 'MSc (Computer Science) cum laude, Stellenbosch University (supervisors: Willem Visser and Cornelia Inggs). PhD in progress (supervisor: Brink van der Merwe) – Automata theory with a focus on regular expression matching.', NULL),
('lynette-van-zijl', 'Lynette van Zijl', 'Professor', 'Academic Staff', 'Computer Science Division, Department of Mathematical Sciences', 'lvzijl@cs.sun.ac.za', 'lvzijl@sun.ac.za', '+27 21 808 4232', 'A520, General Engineering Building', 'My research interests lie in automata and formal languages, as well as the computer science foundations underlying applications in nature conservation research and assistive technologies.', '["Automata and formal languages","Computer science foundations for nature conservation research","Assistive technologies"]', NULL, NULL),
('brink-van-der-merwe', 'Prof. Brink van der Merwe', 'Professor', 'Academic Staff', 'Computer Science Division, Department of Mathematical Sciences', 'abvdm@cs.sun.ac.za', NULL, NULL, 'General Engineering Building', 'Brink van der Merwe is a professor in the Computer Science Division at Stellenbosch University. His research focuses on automata theory, formal languages, regular expression matching, and program verification. His work spans theoretical computer science and practical verification tools, with applications in software correctness and computational systems.

He has supervised numerous postgraduate students and actively contributes to research in descriptional complexity and formal models of computation.', '["Automata theory","Formal languages","Regular expression matching","Program verification","Descriptional complexity","Software correctness"]', NULL, NULL),
('walter-schulze', 'Walter Schulze', 'Researcher', 'Informatics Division', 'Computer Science Division, Department of Mathematical Sciences', 'walter@walterschulze.org', NULL, NULL, 'General Engineering Building', 'Walter Schulze is a researcher in Informatics at Stellenbosch University whose work focuses on formal language theory, regular expressions, programming language design, and algorithmic music generation. His research intersects theoretical computer science and creative computation, particularly in the application of formal grammars and automata to music and language processing systems.

His notable work includes pioneering research in music generation using Markov models and formal language theory approaches to computational creativity.', '["Formal Language Theory","Automata & Regular Expressions","Regular Expression Derivatives","Programming Languages","Serialization Systems","Music Generation with Formal Models","Computational Creativity"]', NULL, NULL);

-- Publications for Lynette (timeline by year, descending on frontend)
-- Person id for Lynette = 2 (assuming seed order)
INSERT OR IGNORE INTO publications (person_id, year, citation, venue, tags_json) VALUES
(2, 2025, 'L. van Zijl et al., Advanced Topics in Automata Theory, International Journal of Computer Science', 'International Journal of Computer Science', '["journal"]'),
(2, 2024, 'L. van Zijl, M. Researchers, Applications of Formal Languages in Conservation Biology, Conference on Computational Biology', 'Conference on Computational Biology', '["conference"]'),
(2, 2023, 'L. van Zijl, Assistive Technology Frameworks Using Automata Theory, ACM Transactions on Accessible Computing (Best Paper Award)', 'ACM Transactions on Accessible Computing', '["journal","award"]'),
(2, 2022, 'L. van Zijl et al., Pattern Recognition in Wildlife Tracking Systems, SLTAT 2022', 'SLTAT 2022', '["conference"]'),
(2, 2021, 'L. van Zijl, Finite State Machines in Natural Language Processing, Journal of NLP Research', 'Journal of NLP Research', '["journal"]'),
(2, 2020, 'L. van Zijl, A. Collaborator, Computational Models for Conservation Data Analysis, Environmental Modelling & Software', 'Environmental Modelling & Software', '["journal"]'),
(2, 2019, 'L. van Zijl, Automata-Based Approaches to Accessibility, SLTAT 2019', 'SLTAT 2019', '["conference"]'),
(2, 2019, 'L. van Zijl et al., Theoretical Foundations of Wildlife Monitoring Systems, Ecological Informatics', 'Ecological Informatics', '["journal"]'),
(2, 2018, 'L. van Zijl, Formal Language Theory in Assistive Technology Design, ICTAC 2018', 'ICTAC 2018', '["conference"]'),
(2, 2018, 'L. van Zijl, M. Smith, Context-Free Grammars for Biological Sequence Analysis, SAICSIT 2018', 'SAICSIT 2018', '["conference"]'),
(2, 2017, 'L. van Zijl, Deterministic Finite Automata Applications, DCFS 2017', 'DCFS 2017', '["conference"]'),
(2, 1991, 'L. van Zijl, Early Work in Formal Languages and Computation, PhD Dissertation, Stellenbosch University', 'PhD Dissertation, Stellenbosch University', '["thesis"]');

-- Publications for Willem (id=1)
INSERT OR IGNORE INTO publications (person_id, year, citation, venue) VALUES
(1, 2023, 'W. H. K. Bester, B. van der Merwe, Efficient Regular Expression Matching Using Finite Automata', 'Journal of Universal Computer Science'),
(1, 2020, 'W. H. K. Bester, C. Inggs, W. Visser, A Study of Efficient Glushkov Automata Construction', 'SAICSIT Conference Proceedings');

-- News (2 items)
INSERT OR IGNORE INTO news (slug, title, excerpt, body_md, published_at) VALUES
('cs-professor-wins-ai-research-award', 'CS Professor Wins Prestigious AI Research Award', 'Prof. Anderson recognized for groundbreaking work in neural architecture search and deep learning applications.', 'Full story content here.', '2026-02-26T00:00:00Z'),
('breakthrough-quantum-computing-published', 'Breakthrough in Quantum Computing Published in Nature', 'Research team achieves new milestone in quantum error correction, paving the way for practical quantum computers.', 'Full story content here.', '2026-02-20T00:00:00Z');

-- Events (2 items)
INSERT OR IGNORE INTO events (slug, title, body_md, location, start_at, end_at) VALUES
('ai-ml-symposium-2026', 'AI & Machine Learning Symposium 2026', 'Annual symposium featuring keynotes from leading AI researchers.', 'Main Auditorium, Stellenbosch Campus', '2026-03-05T09:00:00Z', '2026-03-05T17:00:00Z'),
('phd-research-seminar-march', 'PhD Research Seminar Series', 'Monthly seminar showcasing cutting-edge research from our doctoral candidates.', 'Seminar Room 1', '2026-03-12T14:00:00Z', '2026-03-12T16:00:00Z');

-- Programme: BSc Computer Science (single programme with focal areas as notes)
INSERT OR IGNORE INTO programmes (slug, name, focal_area, admission_requirements_md, continued_study_md, notes_md) VALUES
('bsc-computer-science', 'BSc Computer Science', 'General Computer Science', 'Afrikaans or English (Home Language or First Additional Language) – minimum 50%\nMathematics – minimum 70%\nAny other school subject from the designated subject list – minimum 50%\nOR Physical Sciences – minimum 50% (if planning to take Physics or Chemistry)', 'If you take applicable elective modules, this focal area leads to honours programmes in: Applied Mathematics, Computer Science, Economics, General Linguistics, Genetics, GeoInformatics, Mathematical Statistics, Mathematics, Operations Research, Statistics.', 'Three focal areas: General Computer Science, Computer Systems, Data Science.');

-- Programme years (1, 2, 3) for programme_id = 1
INSERT OR IGNORE INTO programme_years (programme_id, year_number, min_credits, max_credits, notes_md) VALUES
(1, 1, 124, 140, 'Compulsory 92 credits + Elective 32-48 credits'),
(1, 2, 128, 128, 'Compulsory 32 credits + Elective 96 credits'),
(1, 3, 128, 128, 'Compulsory 64 credits + Elective 64 credits');

-- Programme modules: Year 1 General CS (programme_year_id 1)
INSERT OR IGNORE INTO programme_modules (programme_year_id, group_name, module_code, module_name, credits, is_compulsory, sort_order) VALUES
(1, 'Compulsory', 'CS 114', 'Computer Science 114', 16, 1, 1),
(1, 'Compulsory', 'CS 144', 'Computer Science 144', 16, 1, 2),
(1, 'Compulsory', 'MATH 114', 'Mathematics 114', 16, 1, 3),
(1, 'Compulsory', 'MATH 144', 'Mathematics 144', 16, 1, 4),
(1, 'Compulsory', 'STAT 114', 'Probability Theory and Statistics 114', 16, 1, 5),
(1, 'Compulsory', 'SCI 179', 'Science in Context 179', 12, 1, 6),
(1, 'Elective', 'AMATH 144', 'Applied Mathematics 144', 16, 0, 10),
(1, 'Elective', 'MATH 154', 'Mathematics 154', 16, 0, 11);

-- Year 2 (programme_year_id 2)
INSERT OR IGNORE INTO programme_modules (programme_year_id, group_name, module_code, module_name, credits, is_compulsory, sort_order) VALUES
(2, 'Compulsory', 'CS 214', 'Computer Science 214', 16, 1, 1),
(2, 'Compulsory', 'CS 244', 'Computer Science 244', 16, 1, 2);

-- Year 3 (programme_year_id 3)
INSERT OR IGNORE INTO programme_modules (programme_year_id, group_name, module_code, module_name, credits, is_compulsory, sort_order) VALUES
(3, 'Compulsory', 'CS 313', 'Computer Science 313', 16, 1, 1),
(3, 'Compulsory', 'CS 314', 'Computer Science 314', 16, 1, 2),
(3, 'Compulsory', 'CS 343', 'Computer Science 343', 16, 1, 3),
(3, 'Compulsory', 'CS 344', 'Computer Science 344', 16, 1, 4);
