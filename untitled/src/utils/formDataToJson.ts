export function formDataToJson(formData: FormData): Record<string, any> {
  const jsonObject: Record<string, any> = {};

  for (const [key, value] of formData.entries()) {
    // Check if the key already exists and is an array
    if (jsonObject[key]) {
      // If it's not an array, convert it to an array
      if (!Array.isArray(jsonObject[key])) {
        jsonObject[key] = [jsonObject[key]];
      }
      // Push the new value
      jsonObject[key].push(value);
    } else {
      jsonObject[key] = value;
    }
  }
  return jsonObject;
}
