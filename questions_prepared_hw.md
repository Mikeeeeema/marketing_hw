1. What is `XMLHttpRequest`? What are its disadvantages?
2. What is `HttpClientModule` in Angular? How does it improve upon using `XMLHttpRequest`?
3. How do you implement a global HTTP interceptor using Angular’s `HttpClient`? What can be handled with it?
4. How do you cancel an HTTP request in Angular using `HttpClient`? What are the recommended approaches?
5. Can you give an example of using `HttpClient` based on Angular Signals? What are the advantages and disadvantages?



### 1. **What is `XMLHttpRequest`? What are its disadvantages?**

**Answer:**

- `XMLHttpRequest` (XHR) is a browser API that allows JavaScript to send HTTP requests to a server and receive responses asynchronously without reloading the page.
- It originated in Internet Explorer 5 (1999) and became the foundation of AJAX.

**Simple GET example using XHR:**

```js
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.example.com/data', true);
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      console.log('Success:', xhr.responseText);
    } else {
      console.error('Error:', xhr.status);
    }
  }
};
xhr.send();
```

**Disadvantages of XHR:**

- Very verbose syntax (must handle `readyState`, `status`, etc. manually).

- Callback-based, leading to "callback hell" in complex scenarios.

  - ```javascript
    const xhr1 = new XMLHttpRequest();
    xhr1.open('GET', '/api/data1', true);
    xhr1.onreadystatechange = function() {
      if (xhr1.readyState === 4 && xhr1.status === 200) {
        console.log('First request done.');
    
        // 第二个请求只能等第一个请求成功后再发
        const xhr2 = new XMLHttpRequest();
        xhr2.open('GET', '/api/data2?ref=' + xhr1.responseText, true);
        xhr2.onreadystatechange = function() {
          if (xhr2.readyState === 4 && xhr2.status === 200) {
            console.log('Second request done.');
    
            // 第三个请求依赖第二个结果
            const xhr3 = new XMLHttpRequest();
            xhr3.open('GET', '/api/data3?ref=' + xhr2.responseText, true);
            xhr3.onreadystatechange = function() {
              if (xhr3.readyState === 4 && xhr3.status === 200) {
                console.log('Third request done.');
              }
            };
            xhr3.send();
          }
        };
        xhr2.send();
      }
    };
    xhr1.send();
    
    ```

- No built-in Promise support (you have to manually wrap it).

- Error handling is complicated: you must separately catch HTTP and network errors.

- Nowadays replaced by `fetch()` API, Angular's `HttpClient`, or libraries like Axios.

------

### 2. **What is `HttpClientModule` in Angular? How does it improve upon using `XMLHttpRequest`?**

**Answer:**

- `HttpClientModule` is an official Angular module (`@angular/common/http`) that provides an easy, powerful API to make HTTP requests.
- Internally, it uses `XMLHttpRequest` or `fetch()`, but wraps them with a modern RxJS Observable-based API.

**Setup Example:**

```ts
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [HttpClientModule],
})
export class AppModule {}
```

**Making a GET request:**

```ts
import { HttpClient } from '@angular/common/http';

constructor(private http: HttpClient) {}

getData() {
  this.http.get('https://api.example.com/data').subscribe({
    next: (data) => console.log(data),
    error: (err) => console.error('Request failed', err),
  });
}
```

```ts
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

@Component({
  selector: 'app-example',
  standalone: true,
  template: `Example`,
  imports: [],
})
export class ExampleComponent {
  private http = inject(HttpClient);   // <-- 直接注入

  ngOnInit() {
    this.http.get('/api/data').subscribe(data => console.log(data));
  }
}

```



**Improvements compared to XHR:**

- **Observable support:** integrates smoothly with Angular’s reactivity and RxJS operators.
- **Interceptors:** easily modify requests/responses globally (authentication, logging, error handling).
- **Automatic JSON parsing:** no need to manually `JSON.parse()`.
- **Strong typing with TypeScript generics.**
- **Integrated with Angular’s change detection and lifecycle.**

------

### 3. **How do you implement a global HTTP interceptor using Angular’s `HttpClient`? What can be handled with it?**

**Answer:**

An HTTP Interceptor globally intercepts every HTTP request or response, allowing centralized handling like authentication, logging, or error handling.

**Basic Interceptor Example:**

```ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const clonedRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer your-token-here'),
    });
    return next.handle(clonedRequest);
  }
}
```

**Register the Interceptor:**

```ts
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
})
export class AppModule {}
```

**What can be handled with interceptors:**

- Automatically attach authentication tokens.
- Handle errors globally.
- Modify requests/responses (for example, add default headers).
- Manage global loading indicators.
- Log traffic for debugging.

------

### 4. **How do you cancel an HTTP request in Angular using `HttpClient`? What are the recommended approaches?**

**Answer:**

There are two recommended ways to cancel HTTP requests in Angular:

------

**Way 1: Using RxJS `takeUntil()` + `Subject`**

```ts
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

private destroy$ = new Subject<void>();

ngOnInit() {
  this.http.get('/api/data').pipe(
    takeUntil(this.destroy$)
  ).subscribe(data => console.log(data));
}

ngOnDestroy() {
  this.destroy$.next();     // Emit a value to trigger cancellation
  this.destroy$.complete(); // Complete the subject to clean up
}
```

> This is a standard Angular pattern: automatically cancel requests when the component is destroyed.

------

**Way 2: Using `AbortController` (supported in Angular 15+)**

```ts
const controller = new AbortController();
this.http.get('/api/data', { signal: controller.signal })
  .subscribe({
    next: res => console.log(res),
    error: err => console.error('Request cancelled', err)
  });

// Manually cancel the request
controller.abort();
```

------

**Important clarification:**

- `AbortController` is a **browser native API** (not Angular Signals).
- It is used to **manually cancel** requests when needed (like when clicking a Cancel button).

------

### 5. **Can you give an example of using `HttpClient` based on Angular Signals? What are the advantages and disadvantages?**

**Answer:**

Starting from Angular 16+, you can use `toSignal()` to convert an Observable into a Signal, enabling more reactive and declarative handling of HTTP data.

**Example using `toSignal()`:**

```ts
import { toSignal } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';

user = toSignal(this.http.get<User>('/api/user/123'), { initialValue: null });
```

**Using it in the template:**

```ts
<div *ngIf="user() as u">
  {{ u.name }}
</div>
```

------

**Advantages of using Signal with HttpClient:**

- Cleaner and more declarative than manual subscription.
- No need for `| async` or manual `.subscribe()`.
- The UI automatically updates when the data is ready.
- Integrates naturally with Angular's new Signal system (`computed()`, `effect()`, etc.).

------

**Disadvantages:**

- Still experimental (API may change in future versions).
- Limited for complex use cases (like retries, error handling, stream merging — you still need RxJS).
- Only available in Angular 16+.
- Might cause confusion if mixed with traditional Observable-based code.



# 5 Questions 2025.4.29

1. How would NgRx improve communication between components compared to manual services + Subjects?

   1. ## ✳️ Traditional approach: Services + Subjects

      ### 🔧 What is it?

      - A common way to share state across components in Angular is to:
        1. Create a shared service.
        2. Use `Subject` or `BehaviorSubject` to hold state.
        3. One component pushes data via `.next()`, another component subscribes via `.subscribe()`.

      **Example:**

      ```
      ts
      
      
      CopyEdit
      @Injectable({ providedIn: 'root' })
      export class SharedService {
        private user$ = new BehaviorSubject<User | null>(null);
        userObservable$ = this.user$.asObservable();
      
        setUser(user: User) {
          this.user$.next(user);
        }
      }
      ```

      - ✅ **Pros:** Simple, lightweight, good for small projects.
      - ❌ **Cons:** Hard to track changes, no central state visibility, logic gets scattered and messy in large apps.

      ------

      ## ✅ NgRx: Centralized Reactive State Management

      NgRx is a powerful Redux-style state management library for Angular.
       It introduces a formal state architecture:

      - **Store** → Central source of truth.
      - **Actions** → Describe what happened.
      - **Reducers** → Determine how the state changes.
      - **Effects** → Handle side effects like HTTP calls.

      ------

      # ✅ Advantages of NgRx over manual services + Subjects

      

      | Feature                                               | Why it's better                                              |
      | ----------------------------------------------------- | ------------------------------------------------------------ |
      | ✅ **Centralized State**                               | All state is stored in a single `Store`, not scattered across services. |
      | ✅ **Traceable State Changes**                         | Every change must go through an `Action`, so you can see exactly *what* changed *when* (using Redux DevTools). |
      | ✅ **Immutable State Flow**                            | State is read-only and must be replaced immutably — this prevents accidental state mutation bugs. |
      | ✅ **Separation of Concerns (Effects)**                | Asynchronous logic (e.g., HTTP requests) is handled in `Effects`, not in components or services, making the architecture cleaner. |
      | ✅ **Auto-unsubscribe via `store.select(...) |async`** | When you use `store.select(...)` together with the Angular `|async` pipe in your templates, Angular will **automatically manage the subscription and unsubscription** for you. |
      | ✅ **Scalability**                                     | Large projects benefit from predictable structure and separation of responsibilities. Teams can work in parallel more easily. |

2. When should you choose Signals over traditional Subject or NgRx approaches?

   1. **Use Signals when you want local, simple, reactive state without RxJS overhead.**
       Use **Subjects for lightweight shared state**, and **NgRx for scalable, structured, global state management**. 

   2. Choose **Signals** for modern, reactive **component-local or simple shared state** without RxJS overhead.
       Use **Subjects** for **event broadcasting or stream-based logic**, and use **NgRx** when you need **highly structured, global state management** in a scalable architecture.

   3. ## ✅ **When to Use Signals**

      You should prefer **Angular Signals** when:

      

      | Scenario                                               | Reason                                                       |
      | ------------------------------------------------------ | ------------------------------------------------------------ |
      | ✅ Local component state (e.g. UI toggle, selected tab) | Signals are lightweight and directly reactive, replacing internal `BehaviorSubject`s or `@Input` bindings. |
      | ✅ You want a simple and intuitive reactive model       | Signals use a "pull" model (like variables), making them easy to reason about. |
      | ✅ You want automatic template updates without  async   | Signals allow you to bind values in templates by simply calling the signal like a function (e.g., user()),no need to use the |
      | ✅ You want to avoid RxJS boilerplate                   | Signals eliminate the need for `.subscribe()`, `.next()`, and lifecycle management. |
      | ✅ You're building a modern Angular (v16+) app          | Signals are part of Angular’s move toward fine-grained reactivity and better performance. |

      ------

      ## ⚠️ **When Not to Use Signals Alone**

      Avoid using Signals **by themselves** when:

      

      | Scenario                                                     | Use Instead                          |
      | ------------------------------------------------------------ | ------------------------------------ |
      | ❌ You need async stream operations (debounce, retry, switchMap) | ✅ **RxJS Observable**                |
      | ❌ You need to broadcast events across components or services | ✅ **Subject / BehaviorSubject**      |
      | ❌ You need a global state with action logs, immutability, and DevTools | ✅ **NgRx** (Redux-like architecture) |

3. What is the difference between queryParams and routeParams

   1. ## 🧠 **Short Answer:**

      > `routeParams` are part of the URL **path**, while `queryParams` are part of the URL **query string** (after the `?`).
      >  They serve different purposes and are accessed differently in Angular.

      ------

      ## ✅ 1. **routeParams** — Route Parameters

      ### 📌 What are they?

      - **Required or optional** values defined in the route **path itself**.
      - Usually used to identify a resource (like `id`, `slug`, etc.).

      ### 📍 Example URL:

      ```
      bash
      
      
      CopyEdit
      /user/123
      ```

      ### 📄 Route config:

      ```
      ts
      
      
      CopyEdit
      { path: 'user/:id', component: UserComponent }
      ```

      ### 🔍 Access in component:

      ```
      ts
      
      
      CopyEdit
      constructor(private route: ActivatedRoute) {}
      
      ngOnInit() {
        this.route.params.subscribe(params => {
          console.log(params['id']); // outputs 123
        });
      }
      ```

      ------

      ## ✅ 2. **queryParams** — Query String Parameters

      ### 📌 What are they?

      - Values passed after the `?` in the URL.
      - Typically used for **filtering, pagination, or sorting**.

      ### 📍 Example URL:

      ```
      bash
      
      
      CopyEdit
      /user/123?tab=settings&page=2
      ```

      - `/user/123` → is a route
      - `?tab=settings&page=2` → is a query string

      ### 🔍 Access in component:

      ```
      ts
      
      
      CopyEdit
      this.route.queryParams.subscribe(params => {
        console.log(params['tab']);   // outputs 'settings'
        console.log(params['page']);  // outputs '2'
      });
      ```

4. How would you implement a "retry with backoff" mechanism using RxJS operators like retryWhen?

   1. Use `retryWhen()` + `scan()` + `delay()` to implement retries with custom logic.
       This pattern is useful for **network resilience**, especially for **unstable APIs or flaky connections**.

   2. ## 🧠 **Goal:**

      When an HTTP request fails (e.g., network error), **retry it multiple times** with a **delay that increases** (e.g., 1s → 2s → 4s → ...).

      ------

      ## ✅ **Key RxJS Operators Involved:**

      

      | Operator                   | Role                                         |
      | -------------------------- | -------------------------------------------- |
      | `retryWhen()`              | Defines a custom retry strategy upon error   |
      | `scan()`                   | Keeps track of the retry count               |
      | `delay()` or `delayWhen()` | Adds delay between retries                   |
      | `throwError()`             | Stops retrying when max attempts are reached |

      ------

      ## 📦 **Example: Retry with Exponential Backoff (up to 3 times)**

      ```
      ts
      
      
      CopyEdit
      import { throwError, timer } from 'rxjs';
      import { retryWhen, scan, delay } from 'rxjs/operators';
      
      this.http.get('/api/data').pipe(
        retryWhen(errors =>
          errors.pipe(
            scan((retryCount, err) => {
              if (retryCount >= 3) {
                throw err; // rethrow after 3 attempts
              }
              return retryCount + 1;
            }, 0),
            delay(retryCount => Math.pow(2, retryCount) * 1000) // 1s, 2s, 4s
          )
        )
      ).subscribe({
        next: data => console.log('Data:', data),
        error: err => console.error('Failed after retries:', err)
      });
      ```

5. What is a schematic in Angular? and How do you create your own? 

   1. ## 🧠 **Short Answer:**

      > A **schematic** in Angular is a **template-based code generator** used by the Angular CLI to automate tasks like creating components, modules, services, and even updating code.
      >  You can create your own schematic to scaffold custom files, enforce project conventions, or automate repetitive development tasks.

      ------

      ## ✅ 1. What is a schematic?

      

      | Concept               | Explanation                                                  |
      | --------------------- | ------------------------------------------------------------ |
      | 🔧 What is it?         | A schematic is a **code transformation script** that generates or modifies code using templates and configuration. |
      | 🛠️ Used by?            | Angular CLI (via commands like `ng generate component`)      |
      | 📦 Where does it live? | Inside **Angular DevKit packages** (e.g. `@schematics/angular`) or your own library |
      | 🧩 Why useful?         | Automates repetitive coding tasks like creating boilerplate, enforcing patterns, or updating codebases |

      ------

      ### 📌 Examples of built-in schematics:

      - `ng generate component my-comp`
      - `ng generate module user`
      - `ng add @angular/material`
      - `ng update`

      All of these are backed by schematics.

      ------

      ## ✅ 2. How to create your own schematic (step-by-step)

      ------

      ### 🔧 Step 1: Install schematic CLI tools

      ```
      bash
      
      
      CopyEdit
      npm install -g @angular-devkit/schematics-cli
      ```

      ------

      ### 🔧 Step 2: Create a blank schematic project

      ```
      bash
      
      
      CopyEdit
      schematics blank --name=my-schematics
      cd my-schematics
      npm install
      ```

      This creates a basic schematics project structure:

      ```
      pgsql
      
      
      CopyEdit
      my-schematics/
      ├── src/
      │   └── my-schematics/
      │       ├── index.ts         ← entry point
      │       └── schema.json      ← config schema
      ├── collection.json          ← describes all schematics
      ```

      ------

      ### 🔧 Step 3: Write your schematic logic (`src/my-schematics/index.ts`)

      ```
      ts
      
      
      CopyEdit
      import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
      
      export function mySchematic(_options: any): Rule {
        return (tree: Tree, _context: SchematicContext) => {
          tree.create('/hello.txt', 'Hello Angular Schematic!');
          return tree;
        };
      }
      ```

      ------

      ### 🔧 Step 4: Define your schematic in `collection.json`

      ```
      json
      
      
      CopyEdit
      {
        "schematics": {
          "my-schematics": {
            "description": "A basic schematic",
            "factory": "./src/my-schematics/index#mySchematic"
          }
        }
      }
      ```

      ------

      ### 🔧 Step 5: Test your schematic locally

      ```
      bash
      
      
      CopyEdit
      schematics .:my-schematics
      ```

      It will create `hello.txt` in the current directory.

      ------

      ## ✅ 3. Advanced: Add templates and input options

      You can use templating via `applyTemplates()` to generate dynamic content (like Angular components with custom names), and accept CLI options by defining `schema.json`.

      You can also:

      - Chain multiple rules
      - Modify existing files (like `angular.json`, `app.module.ts`)
      - Run conditionally based on project setup

      ------

      ## ✅ Summary Table

      

      | Feature          | Schematic                                                    |
      | ---------------- | ------------------------------------------------------------ |
      | Purpose          | Code generation or transformation                            |
      | Used by          | Angular CLI (`ng generate`, `ng add`)                        |
      | Written in       | TypeScript (uses AST + file Tree)                            |
      | Key files        | `index.ts`, `collection.json`, optional templates            |
      | Tools            | `@angular-devkit/schematics`, `schematics-cli`               |
      | Custom use cases | Scaffold libraries, enforce architecture rules, automate updates |