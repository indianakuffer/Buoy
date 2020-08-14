require 'test_helper'

class ProfilePicsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @profile_pic = profile_pics(:one)
  end

  test "should get index" do
    get profile_pics_url, as: :json
    assert_response :success
  end

  test "should create profile_pic" do
    assert_difference('ProfilePic.count') do
      post profile_pics_url, params: { profile_pic: { image: @profile_pic.image, user_id: @profile_pic.user_id } }, as: :json
    end

    assert_response 201
  end

  test "should show profile_pic" do
    get profile_pic_url(@profile_pic), as: :json
    assert_response :success
  end

  test "should update profile_pic" do
    patch profile_pic_url(@profile_pic), params: { profile_pic: { image: @profile_pic.image, user_id: @profile_pic.user_id } }, as: :json
    assert_response 200
  end

  test "should destroy profile_pic" do
    assert_difference('ProfilePic.count', -1) do
      delete profile_pic_url(@profile_pic), as: :json
    end

    assert_response 204
  end
end
