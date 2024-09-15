export namespace features {
	
	export class JishoResponseMeaning {
	    english_definitions: string[];
	    part_of_speech: string[];
	
	    static createFrom(source: any = {}) {
	        return new JishoResponseMeaning(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.english_definitions = source["english_definitions"];
	        this.part_of_speech = source["part_of_speech"];
	    }
	}
	export class JishoResponseDataJapanese {
	    word: string;
	    reading: string;
	
	    static createFrom(source: any = {}) {
	        return new JishoResponseDataJapanese(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.word = source["word"];
	        this.reading = source["reading"];
	    }
	}
	export class JishoResponseData {
	    japanese: JishoResponseDataJapanese[];
	    senses: JishoResponseMeaning[];
	
	    static createFrom(source: any = {}) {
	        return new JishoResponseData(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.japanese = this.convertValues(source["japanese"], JishoResponseDataJapanese);
	        this.senses = this.convertValues(source["senses"], JishoResponseMeaning);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class JishoResponse {
	    data: JishoResponseData[];
	
	    static createFrom(source: any = {}) {
	        return new JishoResponse(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.data = this.convertValues(source["data"], JishoResponseData);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	
	

}

