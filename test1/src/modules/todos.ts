//액션 타입 선언
//상태에 어떠한 변화가 예상될 때는 액션을 발생시킨다. 

const ADD_TODO = 'todos/ADD_TODO' as const;
const TOGGLE_TODO = 'todos/TOGGLE_TODO' as const;
const REMOVE_TODO = 'todos/REMOVE_TODO' as const;

// 액션이랑 액션타입

let nextId = 1; // 새로운 항목을 추가 할때 사용할 고유 ID 값

//액션 생성 함수
export const addTodo = (text: string) => ({
    type: ADD_TODO,
    payload: {
        id: nextId++,
        text
    }
});

export const toggleTodo = (id: number) => ({
    type: TOGGLE_TODO,
    payload: id
});

export const removeTodo = (id: number) => ({
    type: REMOVE_TODO,
    payload: id
});


//모든 액션 객체들에 대한 타입 준비
type TodoAction =
    | ReturnType<typeof addTodo>
    | ReturnType<typeof toggleTodo>
    | ReturnType<typeof removeTodo>;

//상태에서 사용할 할일 항목 데이터 타입 정의
export type Todo = {
    id: number;
    text: string;
    done: boolean;
};

//이 모듈에서 관리할 상태는 Todo 객체로 이루어진 배열
export type TodosState = Todo[];

//초기 상태 선언
const initialState: TodosState = [];

//리듀서 작성
function todos(
    state: TodosState = initialState,
    action: TodoAction
): TodosState {
    switch (action.type) {
        case ADD_TODO:
            return state.concat({
                id: action.payload.id,
                text: action.payload.text,
                done: false
            });
        case TOGGLE_TODO:
            return state.map(todo => 
                todo.id === action.payload ? { ...todo, done : !todo.done } : todo);
        case REMOVE_TODO:
            return state.filter(todo => todo.id !== action.payload);
        default:
            return state;
    }

}

export default todos;