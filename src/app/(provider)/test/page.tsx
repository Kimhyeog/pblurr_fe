import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface ReceiveTodos {
  list: Todo[];
  totalCount: number;
}

const PAGE_SIZE = 10;

//todos get 메소드
const getTodos = async (currentPage: number, pageSize: number) => {
  const res = await fetch(`/api/todos?page=${currentPage}&size=${pageSize}`);

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);

    const message = errorData?.message || "Failed to fetch";

    throw new Error(message);
  }

  return res.json();
};

//todos의 각 항목 compeleted를 toggle하는 POST 메소드

const toggleTodoCompletion = async (todoId: string): Promise<Todo> => {
  const res = await fetch(`/api/todos/${todoId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    //이 부분은 오류가 났을 시, 에러메시지 처리 부분인데 , 이거 안함?
    const message = errorData?.message || "failed to Post";

    throw new Error(message);
  }

  return res.json();
};

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();

  const onClickNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const onClickPrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  // todos 데이터 fetch 하는 부분

  const { data, isLoading, isError, error } = useQuery<ReceiveTodos>({
    queryKey: ["todos"],
    queryFn: () => getTodos(currentPage, PAGE_SIZE),
    retry: 0,
    staleTime: 1000 * 60 * 5, //1초*60*5==5분
  });
  //data 밑에다가 해야함
  const totalPage = data ? Math.ceil(data.totalCount / PAGE_SIZE) : 1;

  //todos 토글 하는 부분 => useMutation
  const mutation = useMutation({
    // mutationFn : 실제 백엔드 서버 데이터 수정시 사용할 콜백함수 (POST PATCH...)
    mutationFn: toggleTodoCompletion,
    // 성공 시, 실행될 콜백 함수
    onSuccess: () => {
      // 기존 캐시를 무효화하고 데이터를 새로 받는 부분
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      // 성공 시 캐시 무효화 → 데이터 재요청
      //즉, 토글이 반영된 todos들을 다시 불러오는 짓거리를 해줌
      //자동으로 서버에서 다시 가져오도록 트리거 역할할
    },
  });

  if (isLoading) return <div>로딩 스피너</div>;

  if (isError) {
    const errMeg = error?.message || "Unknown error";
    return <div>에러 컴포넌트 : ${errMeg}</div>;
  }

  return (
    <div>
      <ul>
        {data?.list.map((todo) => (
          <div key={todo.id}>
            <p>{todo.title}</p>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => mutation.mutate(todo.id)}
                disabled={mutation.isPending} //이게 뭐임임
              />
              {todo.completed ? "완료됨" : "미완료"}
            </label>
          </div>
        ))}
      </ul>
      <div>
        <button onClick={onClickPrevPage} disabled={currentPage === 1}>
          이전
        </button>
        <button onClick={onClickNextPage} disabled={currentPage === totalPage}>
          다음
        </button>
      </div>
    </div>
  );
}
