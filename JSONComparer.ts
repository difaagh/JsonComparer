/* tslint:disable:prefer-const */
interface Obj {
  [key: string]: any;
}
export class JSONComparer {
  public compareJSONArrays(json1: any[], json2: any[]): any[] {
    let ratioList: any[] = [];
    const json1Length = json1.length;
    const json2Length = json2.length;

    if (json1Length >= json2Length) {
      for (let i = 0; i < json1Length; i++) {
        const jsonRawObject = json1[i];
        if (jsonRawObject instanceof Object) {
          const jsonObject1 = json1[i];
          const jsonObject2 = json2[i];
          try {
            ratioList[i] = this.compareJsonObject(jsonObject1, jsonObject2);
          } catch (e) {
            const jsonObject = new Object();
            for (const key in jsonObject1) {
              jsonObject[key] = 1;
              // need test
              ratioList[i] = { ...jsonObject };
            }
          }
        } else {
          const jsonArray1 = [json1[i]];
          const jsonArray2 = [json2[i]];
          try {
            ratioList[i] = this.compareJSONArrays(jsonArray1, jsonArray2);
          } catch (e) {
            ratioList[i] = this.compareJSONArrays(jsonArray1, new Array());
          }
        }
      }
    } else {
      for (let i = 0; i < json2Length; i++) {
        const jsonRawObject = json2[i];
        if (jsonRawObject instanceof Object) {
          const jsonObject2 = json2[i];
          const jsonObject1 = json2[i];
          try {
            ratioList[i] = this.compareJsonObject(jsonObject1, jsonObject2);
          } catch (e) {
            const jsonObject = new Object();
            for (const key in jsonObject2) {
              jsonObject[key] = 1;
              // need test
              ratioList[i] = { ...jsonObject };
            }
          }
        } else {
          const jsonArray2 = [json2[i]];
          const jsonArray1 = [json2[i]];

          try {
            ratioList[i] = this.compareJSONArrays(jsonArray1, jsonArray2);
          } catch (e) {
            ratioList[i] = this.compareJSONArrays(new Array(), jsonArray2);
          }
        }
      }
    }

    return ratioList;
  }

  public compareJsonObject(obj1: Object, obj2: Object) {
    const jsonObject = new Object();
    let itemRawObject1;
    let itemRawObject2;
    for (const key in obj1) {
      let json2Length: number = 0.0;
      if (obj1[key].length !== 0 && Object.keys(obj1[key]).length !== 0) {
        itemRawObject1 = obj1[key];
        itemRawObject2 = obj2[key];
        if (typeof itemRawObject1 === "string") {
          try {
            json2Length = itemRawObject2.length;
            jsonObject[key] = itemRawObject1.length / json2Length;
          } catch (e) {
            jsonObject[key] = 1;
          }
        } else if (!Array.isArray(itemRawObject1)) {
          const jsonObject1 = obj1[key];
          const jsonObject2 = obj2[key];
          try {
            jsonObject[key] = this.compareJsonObject(jsonObject1, jsonObject2);
          } catch (e) {
            jsonObject[key] = this.compareJsonObject(jsonObject1, new Object());
          }
        } else if (Array.isArray(itemRawObject1)) {
          const jsonArray1 = obj2[key];
          const jsonArray2 = obj2[key];
          try {
            jsonObject[key] = this.compareJSONArrays(jsonArray1, jsonArray2);
          } catch (e) {
            jsonObject[key] = this.compareJSONArrays(jsonArray1, new Array());
          }
        }
      }
    }
    return jsonObject;
  }
}
const hasil = [
  {
    country: { nativeName: 0.28, code: 1, name: 1.2 },
    occupation: 1,
    address: 0.4642857,
    lastEducation: 2.5,
    shoppingHistory: [
      { date: 1, goods: [{ name: 1 }, { name: 1 }, { name: 1 }] },
    ],
    name: 0.6666667,
    about: 0.4642857,
  },
  {
    country: { nativeName: 0.2647059, code: 1, name: 0.5555556 },
    occupation: 1,
    address: 1,
    lastEducation: 1,
    name: 1,
    about: 1,
  },
];
const data1 = [
  {
    name: "Prajnaparamitta",
    about: "Lorem ipsum dolor sit amet consectetur adiscipicing elit",
    occupation: "Mad Doctor",
    address: "Somewhere on the earth No. XXX, Uvuvwevwevwe Ossas State",
    lastEducation: "HS",
    country: {
      code: "CHN",
      name: "China",
      nativeName: "Zhonghua Renmin Gongheguo",
    },
    shoppingHistory: [
      {
        id: 1,
        date: "12/12/2019",
        goods: [
          {
            id: 1,
            name: "Froggy Bag",
            qty: 1,
          },
          {
            id: 2,
            name: "Freak chocolate",
            qty: 10,
          },
          {
            id: 5,
            name: "Broken umbrella",
            qty: 1,
          },
        ],
      },
    ],
  },
  {
    name: "ADMIn",
    about: "Sine cosine tangent secant cosecant cotangent ",
    occupation: "Programmer",
    address: "Somewhere on the earth 11 XXX Secret XXX",
    lastEducation: "VHS",
    country: {
      code: "IDN",
      name: "Indonesia",
      nativeName: "Negara Kesatuan Republik Indonesia",
    },
    shoppingHistory: [],
  },
];
const data2 = [
  {
    name: "kwmdlqkwmd",
    about: "DLKWQMdoqwindqiwdnwqodnqwt",
    occupation: "121390jf2e",
    address: "ldkmuvwevwevwe Ossas State",
    lastEducation: "12221",
    country: {
      code: "SWE",
      name: "Sweden",
      nativeName: "Sverige",
    },
    shoppingHistory: [
      {
        id: 1,
        date: "12/12/2019",
        goods: [
          {
            id: 1,
            name: "Froggy Bag",
            qty: 1,
          },
          {
            id: 2,
            name: "Freak chocolate",
            qty: 10,
          },
          {
            id: 5,
            name: "Broken umbrella",
            qty: 1,
          },
        ],
      },
    ],
  },
  {
    name: "Prasna",
    about: "Sine cosine tangent secant cosecant cotangent ",
    occupation: "Programmer",
    address: "Somewhere on the earth 11 XXX Secret XXX",
    lastEducation: "VHS",
    country: {
      code: "JPN",
      name: "Japan",
      nativeName: "Nihonkoku",
    },
  },
];
const compare = new JSONComparer();
const b = compare.compareJSONArrays(data1, data2);
console.log(b);
