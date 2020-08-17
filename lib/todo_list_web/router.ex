defmodule TodoListWeb.Router do
  use TodoListWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", TodoListWeb do
    pipe_through :browser

    get "/", PageController, :index
  end

  # Other scopes may use custom stacks.
  scope "/api" do
    pipe_through :api

    get "/", Absinthe.Plug.GraphiQL, schema: TodoListWeb.Api.Schema, interface: :playground
    post "/", Absinthe.Plug, schema: TodoListWeb.Api.Schema
  end

  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/" do
      pipe_through :browser
      live_dashboard "/dashboard", metrics: TodoListWeb.Telemetry
    end
  end
end
