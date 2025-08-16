import { rules, createComparison } from "../lib/compare.js"

// export function initSearching(searchField) {
//     // @todo: #5.1 — настроить компаратор

//     return (data, state, action) => {
//         // @todo: #5.2 — применить компаратор
//         return data;
//     }
// }

export function initSearching(searchField) {
  // Компаратор для поиска
  const comparator = (item, query) => {
    // Если поле поиска не указано, ищем по всем строковым полям
    const fields = searchField
      ? [searchField]
      : Object.keys(item).filter((key) => typeof item[key] === "string")

    // Приводим запрос к нижнему регистру
    const lowerCaseQuery = query.toLowerCase()

    return fields.some((field) => {
      const value = item[field]
      return (
        typeof value === "string" &&
        value.toLowerCase().includes(lowerCaseQuery)
      )
    })
  }

  return (data, state, action) => {
    // Получаем текущий запрос из стейта
    const query = state.search || ""

    // Если запрос пустой - возвращаем все данные
    if (!query) {
      return data
    }

    // Фильтруем данные через компаратор
    return data.filter((item) => comparator(item, query))
  }
}
