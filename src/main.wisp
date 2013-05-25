(ns try-wisp.main
  (:require [codemirror-activine :as activine]
            [codemirror-persist :as persist]
            [wisp.engine.browser]
            [wisp.sequence :refer [rest cons vec]]
            [wisp.runtime :refer [str]]
            [wisp.reader :refer [read*]]
            [wisp.compiler :refer [compile*]]))


;; Install other plugins

;(activine CodeMirror)
(persist CodeMirror)


(defn throttle
  "Creates function that calls throttles calls to given `f` such that,
  it's only called if no further calls are made with in the time
  frame (in miliseconds) returned by given `delay.apply(this, arguments)`
  function."
  [lambda ms]
  (let [id 0]
    (fn throttled [& params]
      (clearTimeout id throttled)
      (set! id (.apply setTimeout window (vec (cons lambda (cons ms params))))))))


(defn toogle-preview!
  []
  (let [output (.get-element-by-id document :output)
        input (.get-element-by-id document :input)]
    (set! output.hidden (not output.hidden))
    (set! input.style.width (if output.hidden "100%" "50%"))))

(def *error-marker* (let [view (.create-element document :span)]
                      (set! view.textContent "●")
                      (set! view.style.color "black")
                      (set! view.style.opacity "0.5")
                      view))

(def update-preview!
  (throttle (fn [editor]
              (let [code (.get-value editor)]
                (set! local-storage.buffer code)
                (try (do
                       (.clearGutter editor :error-gutter)
                       (.set-value output (compile* (read* code "scratch.wisp"))))
                  (catch error
                    (do
                      (.setAttribute *error-marker* :title error.message)
                      (.setGutterMarker editor
                                        (or error.line 0)
                                        :error-gutter
                                        *error-marker*))))))
            200))

(def input
  (CodeMirror (.get-element-by-id document :input)
              {:lineNumbers true
               :matchBrackets true
               :electricChars true
               :persist true

               :styleActiveLine true
               :autofocus true
               :value (.-innerHTML (.get-element-by-id document :examples))

               :theme "solarized dark"
               :mode :clojure
               :autoClearEmptyLines true
               :fixedGutter true
               :gutters [:error-gutter]

               :extraKeys {:Tab :indentSelection}
               :onChange update-preview!
               :onGutterClick toogle-preview!}))

(.on input :change update-preview!)
(.on input :gutterClick toogle-preview!)
(update-preview! input)

(def output (CodeMirror (.get-element-by-id document :output)
                        {:lineNumbers true
                         :fixedGutter true
                         :matchBrackets true
                         :mode :javascript
                         :theme "solarized dark"
                         :readOnly true}))
