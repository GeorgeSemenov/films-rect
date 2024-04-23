Приветствую.
Данный список вопросов относится к моему проекту [films-rect](https://github.com/GeorgeSemenov/films-rect/) в данный момент перевожу проект на RTK Query (ветка task43_add-redux)

#### Вопрос №1 **Как обрабатывать запросы для зависимых эндпоинтов?**

Как обрабатывать запросы для связанных эндпоинтов?  
Допустим у меня есть эндпоинт для получения списка избранных фильмов. **UseGetFavFilmsQuery(user)** Но проблема в том, что для этого хука нужно передать данные о пользователе, которые я получаю другим хуком **useGetUserQuery().**  
Итак я не могу использовать следующий код, т. к. хук нельзя класть в тело условия.

```jsx
//вариант номер один
const {data: user} = useGetUserQuery()
const {data: favFilms} = UseGetFavFilmsQuery(user) //Нельзя, ведь не известно — удалось ли подтянуть user или нет.

//вариант номер два
const {data: user} = useGetUserQuery()
if(user) const {data: favFilms} = UseGetFavFilmsQuery(user) //Нельзя хуки класть в тело условия

//вариант номер три (рабочий, но придётся создавать лишний компонент), **хотелось бы уйти от этого.**
const {data: user} = useGetUserQuery()
if(user){ return <FavFilms user={user}/>}
else{ return <p> Ожидается загрузка данных с сервера</p>}
```

#### Вопрос №2 **Как можно подгрузить все фильмы за один эндпонит?**

Дело в том, что избранные фильмы подтягиваются массивом из 20 фильмов и с указанием сколько всего таких массивов по 20 фильмов на сервере, за это отвечает переменная totalPages.  
Вот пример возвращаемого значения:

```ts
function useGetFavFilms(user: IUser): {
  result: IfavFilm[];
  totalPages: number;
};
```

Но мне нужно подгрузить все избранные фильмы, а не только 20 штук. Можно ли сделать эндпоинт, который бы подтягивал все фильмы?  
Раньше я для этого использовал самодельный хук Который бы просто в цикле отправлял запросы totalPages раз. Но используя кастомные хуки я теряю возможность использовать функционал тэгов в API RTK Query, грубо говоря, если я отправлю мутацию на сервер то мой кастомный хук - не подтянет обновлённые данные с сервера, поэтому кастмный хук - скорее костыль чем решение, хотелось бы уйти от него.
Инетересно, как это лучше реализовать с использованием RTKQuery? Можно ли написать один хук, который делает несколько запросов на севрер, пока не выгрузит все данные (напомню, что в цикле использовать хуки нельзя) и при этом бы использовал функционал тэгов?

#### Вопрос №3 \*\*как лучше сравнивать является ли фильм избранным или нет(нужно ли подтягивать все данные с сервера?

\*\*Мне нужно при отображении списка фильмов — указывать избранный фильм или нет.  
Для этого я подгружаю просто фильмы(обычно за раз это массив из 20 штук) с помощью useGetFilms и с помощью самодельного хука useGetAllFavFilms — подгружаю ВСЕ избранные фильмы.  
Дальше я просто беру и проверяю пробегаюсь по массиву films и проверяю — есть ли такой фильм в массиве favFilms? Если есть — ставлю ему звёздочку (избранный).  
Мне кажется это не продуктивно, а вдруг пользователь будет отмечать избранными все фильмы, такие запросы на сервер будут очень ресурсозатратными.

Как вы отмечаете фильмы избранными? Как это лучше делать мне?

#### Вопрос №4 Как поддерживать локальные данные в актуальном состоянии?

_Этот вопрос напрямую связан с предыдущим_
Мне нужно при изменении фильтров подтягивать данные с сервра Есть код:

```tsx
useEffect(() => {
  fetchAllFavoriteFilms(user).then((result) => {
    if (result.favoriteFilms) setFavoriteFilms(result.favoriteFilms);
    if (result.error) setError({ error: result.error });
  });
}, [favoriteFilms]);
```

Из-за того, что favoriteFilms обновляется => useEffect постоянно должен запускаться, если убрать из массива зависимостей favoriteFilms – то useEffect запуститься только один раз, но теперь если я отправлю на сервер изменённый список favoriteFilms то useEffect не подтянет новые данные, для отображения.
Получается из-за своего кастомного хука, который подтягивает все избранные фильмы - я не могу следить за изменениями этих фильмов на севере. Как мне отслеживать изменения избранных фильмов на сервере?

#### Вопрос №5 **как в** **RTK Query** **следить за подтягиванием не связанных данных?**

Есть состояние filters(которое содержит свойство searchQuery) и есть состояние filmsData (которое содержит массив films). Дык вот как при изменении searchQuery обновлять массив films? Я понимаю примерно, как работают тэги и когда производиться мутация то query таким же тегом будет выполненно следом, чтобы держать данные в актуальном состоянии. Но тут же речь идёт о локальных слайсах, где тэги не используются.  
Пока что я додумался только (в компоненте filtersAndFilms) создать ещё несколько состояний (fetchedFilmsData, isLoadingFilms, errorFetchedFilms) и дополнительный useEffect у которого в массиве зависимостей указан filters, а в тело — useGetFilmQuery , есть ли более лаконичный способ держать связанные локальные данные в актуальном состоянии при их изменении? (Сразу предупреждаю - код не рабочий)

Вот код:(filmsAndFilters)

```tsx
const filters = useFilters();
const [fetchedFilmsData, setFetchedFilmsData] = useState<IFetchedFilmsResponse>(
  { results: [], total_pages: 1 }
);
const [isLoadingFilms, setIsLoadingFilms] = useState<boolean>(true);
const [errorFetchedFilms, setErrorFetchedFilms] = useState("");
const { setGenres, setError, setFilmsData, setUser } = useActions();
useEffect(() => {
  const {
    data: fetchedFilmsData,
    isLoading: isLoadingFilms,
    error: errorFetchedFilms,
  } = useGetFilmsQuery(filters);
  if (fetchedFilmsData) {
    setFetchedFilmsData(fetchedFilmsData);
    setFilmsData(fetchedFilmsData);
    setIsLoadingFilms(false);
  }

  if (errorFetchedFilms) {
    setError({ error: new Error(JSON.stringify(errorFetchedFilms)) });
    setErrorFetchedFilms(JSON.stringify(errorFetchedFilms));
  }
}, [filters]);
```

Но это не помогло, выходит обшибка: invalid hook call, нарушено одно из правил использования хуков, как можно подтягивать новые фильмы при изменении строки поиска в filters

#### Вопрос №7 — **У меня беда печаль с поиском работы, расскажите о своём опыте поиске работы?**

На хх.ру никто не реагирует, расскажите, как вам удалось найти работу, может удастся что-то почерпнуть. Планирую писать рекрутерам на linkedIn -думаете стоит попробовать?

#### Вопрос №8 — **Нужно сделать ревью кода.**

#### Вопрос №6 **по теории** **RTK Query.** - это уже сокрее проверка моих занний. Просто хотел узнать, правильно ли я ответил на поставленные вопросы. Можете не читать, я не привёл в порядок эти записи.

Собирая информацию я почти везде натыкаюсь на сообщение, что нужно использовать одно API на приложение. Разные эндпоинты нужно создавать с помощью инжектирования.  
Исключение может быть, только в случае, если подтягиваются данные с разных серверов.

**https://www.reddit.com/r/reactjs/comments/10x7aq8/how_to_properly_setup_different_endpoints_for_rtk/**

![](file:///tmp/lu225753fl2g.tmp/lu225753fl2u_tmp_fc39348036aaee62.png)  
![](file:///tmp/lu225753fl2g.tmp/lu225753fl2u_tmp_913d4c1c65ef1c76.png)  
**https://redux-toolkit.js.org/rtk-query/api/createApi**

![](file:///tmp/lu225753fl2g.tmp/lu225753fl2u_tmp_cee1f213055d650a.png)  
В связи с этим у меня есть вопросы:

1. Почему у меня на стажировке используют несколько createApi? Есть ли в этом смысл?  
   Я спрашивал, но мне не дали ответа.

2)ReducerPath - что это ? Я думал сюда нужно писать название сущностей, которые будут изменяться под влиянием эндпонитов, но теперь уже не уверен. Что писать в ReducerPath если на всё приложение рекомендуется создавать лишь одно API ?

![](file:///tmp/lu225753fl2g.tmp/lu225753fl2u_tmp_12af7dfc951d1cbc.png)

3)tagTypes: [] - что сюда писать? Раньше я думал что сюда нужно писать тэги, которые позволят отслеживать данные которые будут изменяться под воздействием эндпоинтов. Но похоже я ошибся и для этих целей стоит использовать invalidateTags и providesTags.

![](file:///tmp/lu225753fl2g.tmp/lu225753fl2u_tmp_d961bbfb25cdddca.png)

![](file:///tmp/lu225753fl2g.tmp/lu225753fl2u_tmp_51f3d3423ac0d247.png)  
![](file:///tmp/lu225753fl2g.tmp/lu225753fl2u_tmp_b3f40d6a6636eb19.png)

Возможные ответы (нашёл сам, но хотелось бы знать, правильно ли я понял)  
\***\*tag\*\*** - строка, которая является "Лэйблом" для кэшируемой ифнормации. Что-то вроде надписи на банке с вареньем, чтобы знать, какие ягоды хранятся в этом стеклянном кэше. \***\*tagTypes\*\*** - Массив строк, в котором указываются какие лэйблы будут использоваться для кэширования информации в создаваемом API.

JavaScript
`ts`
`const api = createApi({`
`baseQuery: fetchBaseQuery({ baseUrl: '/' }),`
`tagTypes: ['Posts', 'Articles' ],`
`endpoints: (build) => ({})`

\***\*providesTags\*\*** - Может быть массивом тэгов(строк) либо колбэком, возвращающим такой массив. Указывается в эндпоинтах с GET запросом (query), это нужно, чтобы знать, какие данные зависят от данных с сервера, чтобы при изменении серверных данных их подтянуть и актуализировать (работает в связке с invalidatesTags)

JavaScript
`ts`
`endpoints: (build) => ({`
`getPosts: build.query<Post[], void>({`
`query: () => '/posts',`
`providesTags: ['Post'],`
`}),`

\***\*invalidateTags\*\*** - Может быть массивом тэгов(строк) либо колбэком, возвращающим такой массив. При отправке запросов о изменении данных на сервере (mutation) нужно актуализировать локальные данные, чтобы не было расхождений(работает в связке с providesTags).

JavaScript
`ts`
`addPost: build.mutation<Post, Omit<Post, 'id'>>({`
`query: (body) => ({`
`url: 'post',`
`method: 'POST',`
`body,`
`}),`
`invalidatesTags: ['Post'],`
`}),`

Более подробно вы можете прочитать тут - [https://redux-toolkit.js.org/rtk-query/usage/automated-refetching](https://redux-toolkit.js.org/rtk-query/usage/automated-refetching) Теперь про \***\*ReducerPath\*\*** - используется для хранения данных запросов и результатов в Redux-стейте по указанному reducerPath. Если я правильно понял - больше нигде не используется, можно относится к этому как к имени переменной, которая служит для работы библиотеки, но не программиста.