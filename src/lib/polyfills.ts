// Polyfills for browser compatibility, especially Microsoft Edge

// Object.entries polyfill for Edge compatibility
if (!Object.entries) {
  Object.entries = function(obj: any): [string, any][] {
    const ownProps = Object.keys(obj);
    let i = ownProps.length;
    const resArray = new Array(i); // preallocate the Array
    while (i--) {
      resArray[i] = [ownProps[i], obj[ownProps[i]]];
    }
    return resArray;
  };
}

// Object.values polyfill for additional compatibility
if (!Object.values) {
  Object.values = function(obj: any): any[] {
    return Object.keys(obj).map(key => obj[key]);
  };
}

// Object.fromEntries polyfill for complete compatibility
if (!Object.fromEntries) {
  Object.fromEntries = function(entries: Iterable<readonly [PropertyKey, any]>): any {
    const obj: any = {};
    for (const [key, value] of entries) {
      obj[key] = value;
    }
    return obj;
  };
}

// Export for explicit imports if needed
export const polyfills = {
  objectEntries: Object.entries,
  objectValues: Object.values,
  objectFromEntries: Object.fromEntries,
};

// Auto-execute polyfills
console.log('✅ Browser compatibility polyfills loaded');