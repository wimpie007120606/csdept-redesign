import campusBackground from 'figma:asset/aa35fdae5d39aef96d1ba77e86c445c1cc5e4dc4.png';
import willemBesterImage from 'figma:asset/f98a7550d9a9b94939f2edc80d1a6723c3903107.png';
import lynetteVanZijlImage from 'figma:asset/c21387b7264de2fe2f95847f52f9e5cc1b3ea696.png';
import brinkVanDerMerweImage from 'figma:asset/167aac506fe75e4de4a2c510ce66dca988aa3039.png';
import walterSchulzeImage from 'figma:asset/567a1a3e7e9b54908d05e37c3d9a5e76c8aa5b54.png';

export const fallbackPeople = [
  { id: 'whk-bester', slug: 'whk-bester', name: 'W. H. K. Bester', primaryTitle: 'Technical Officer', secondaryTitle: 'Junior Lecturer (since 2014)', department: 'Computer Science Division, Department of Mathematical Sciences', office: 'A508, General Engineering Building', email: 'whkbester@cs.sun.ac.za', secondaryEmail: 'whkbester@gmail.com', phone: '+27 21 808 4232', image: willemBesterImage, researchAreas: ['Formal Languages & Automata Theory', 'Software Engineering (System Programming)', 'Regular Expression Matching', 'Algorithms & Data Structures Efficiency'] },
  { id: 'lynette-van-zijl', slug: 'lynette-van-zijl', name: 'Lynette van Zijl', primaryTitle: 'Professor', secondaryTitle: 'Academic Staff', department: 'Computer Science Division, Department of Mathematical Sciences', office: 'A520, General Engineering Building', email: 'lvzijl@cs.sun.ac.za', secondaryEmail: 'lvzijl@sun.ac.za', phone: '+27 21 808 4232', phoneNote: 'secretary', image: lynetteVanZijlImage, researchAreas: ['Automata Theory', 'Formal Languages', 'Nature Conservation Applications', 'Assistive Technologies'] },
  { id: 'brink-van-der-merwe', slug: 'brink-van-der-merwe', name: 'Prof. Brink van der Merwe', primaryTitle: 'Professor', secondaryTitle: 'Academic Staff', department: 'Computer Science Division, Department of Mathematical Sciences', office: 'General Engineering Building', email: 'abvdm@cs.sun.ac.za', image: brinkVanDerMerweImage, researchAreas: ['Automata Theory', 'Formal Languages', 'Regular Expression Matching', 'Program Verification'] },
  { id: 'walter-schulze', slug: 'walter-schulze', name: 'Walter Schulze', primaryTitle: 'Researcher', secondaryTitle: 'Informatics Division', department: 'Computer Science Division, Department of Mathematical Sciences', office: 'General Engineering Building', email: 'walter@walterschulze.org', image: walterSchulzeImage, researchAreas: ['Lean Systems', 'Regular Expression Derivatives', 'Serialization', 'Music & Programming Languages', 'Formal Language Theory'] },
];

export const campusBg = campusBackground;
